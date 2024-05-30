import React, { ForwardedRef, forwardRef } from 'react';

import { Box, Button, buttonClasses, styled } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import { useIsWorkerOperator } from '@api/subsquid-network-squid';
import { demoFeaturesEnabled } from '@hooks/demoFeaturesEnabled';
import { AccountIcon } from '@icons/AccountIcon';
import { ComputersIcon } from '@icons/ComputersIcon';
import { ContactsIcon } from '@icons/ContactsIcon';
import { DashboardIcon } from '@icons/DashboardIcon';
import { DocumentIcon } from '@icons/DocumentIcon';
import { OpenInNewIcon } from '@icons/OpenInNewIcon';
import { NetworkName, useSubsquidNetwork } from '@network/useSubsquidNetwork';
import { useWorkersChatUrl } from '@network/useWorkersChat';

interface NetworkMenuProps {
  onItemClick: () => void;
}

const MenuItem = styled(Button)(({ theme: { palette, spacing } }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: 60,
  width: '100%',
  color: palette.text.secondary,

  fontWeight: 500,
  textAlign: 'center',
  padding: spacing(0, 3),
  borderRadius: 0,
  marginBottom: spacing(1.5),
  '& .leftIcon': {
    marginRight: spacing(2),
    display: 'flex',
    width: '20px',
    alignItems: 'center',
  },
  '& .rightIcon': {
    height: '20px',
  },
  '& svg:not(.badge) path': {
    transition: 'fill 300ms ease-out',
  },
  ['&:hover']: {
    backgroundColor: palette.background.paper,
    color: palette.info.contrastText,
    // '& svg:not(.badge) path': {
    //   fill: 'red',
    // },
    // '& svg.badge path': {
    //   fill: 'inherit',
    // },
  },
  [`&.selected`]: {
    // backgroundColor: palette.info.main,
    // color: palette.info.contrastText,
    // '& svg:not(.badge) path': {
    //   fill: palette.info.contrastText,
    // },
  },

  [`&.${buttonClasses.disabled}`]: {
    opacity: 0.4,
    backgroundColor: 'transparent',
    color: palette.text.secondary,
    '& svg:not(.badge) path': {
      fill: palette.text.secondary,
    },
  },
}));

const Text = styled(Box)({
  fontSize: '0.875rem',
  flex: 1,
  textAlign: 'left',
});

export const Item = forwardRef(
  (
    {
      forceActive,
      forceInactive,
      path,
      target,
      label,
      disabled,
      LeftIcon,
      RightIcon,
      onClick,
    }: {
      forceActive?: boolean;
      forceInactive?: boolean;
      path: string;
      target?: string;
      disabled?: boolean;
      LeftIcon: any;
      RightIcon?: any;
      label?: string;
      onClick?: () => void;
    },
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const location = useLocation();
    const active = forceActive || (!forceInactive && location.pathname.startsWith(path));

    const button = (
      <MenuItem
        ref={ref}
        onClick={onClick}
        className={active ? 'selected' : undefined}
        disabled={disabled}
      >
        <Box className="leftIcon">
          <LeftIcon />
        </Box>
        <Text>{label}</Text>
        {RightIcon ? (
          <Box className="rightIcon">
            <RightIcon />
          </Box>
        ) : null}
      </MenuItem>
    );

    if (disabled) return button;

    return (
      <Link to={path} target={target} rel={target ? 'noreferrer' : undefined}>
        {button}
      </Link>
    );
  },
);

export const NetworkMenu = ({ onItemClick }: NetworkMenuProps) => {
  const { network } = useSubsquidNetwork();
  const { isWorkerOperator } = useIsWorkerOperator();
  const workersChatUrl = useWorkersChatUrl();

  const showMenu = demoFeaturesEnabled() || network === NetworkName.Testnet;

  return (
    <>
      <div style={{ height: '1.125rem' }} />
      {/*<Item*/}
      {/*  LeftIcon={DashboardIcon}*/}
      {/*  label="Dashboard"*/}
      {/*  onClick={onItemClick}*/}
      {/*  path="/network-dashboard"*/}
      {/*/>*/}

      {showMenu ? (
        <Item LeftIcon={DashboardIcon} label="Dashboard" onClick={onItemClick} path="/dashboard" />
      ) : null}
      <Item LeftIcon={AccountIcon} label="Assets" onClick={onItemClick} path="/assets" />
      {showMenu ? (
        <>
          <Item LeftIcon={ComputersIcon} label="Workers" onClick={onItemClick} path="/workers" />
          <Item
            LeftIcon={AccountIcon}
            label="Delegations"
            onClick={onItemClick}
            path="/delegations"
          />
          <Item LeftIcon={DocumentIcon} label="Gateways" onClick={onItemClick} path="/gateways" />
        </>
      ) : null}

      <div style={{ flex: 1 }} />

      {/*<Item*/}
      {/*  label="Documentation"*/}
      {/*  path={process.env.DOCS_API_URL || ''}*/}
      {/*  target="_blank"*/}
      {/*  LeftIcon={DocumentIcon}*/}
      {/*  RightIcon={OpenInNewIcon}*/}
      {/*/>*/}
      {isWorkerOperator ? (
        <Item
          label="Operators chat"
          path={workersChatUrl || '/null'}
          target="_blank"
          LeftIcon={ContactsIcon}
          RightIcon={OpenInNewIcon}
        />
      ) : null}
      <Item
        label="Community chat"
        path={process.env.DISCORD_API_URL || '/null'}
        target="_blank"
        LeftIcon={ContactsIcon}
        RightIcon={OpenInNewIcon}
      />
    </>
  );
};
