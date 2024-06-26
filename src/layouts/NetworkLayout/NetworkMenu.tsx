import React, { ForwardedRef, forwardRef } from 'react';

import { Box, Button, styled } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import { useIsWorkerOperator } from '@api/subsquid-network-squid';
import { ContactsIcon } from '@icons/ContactsIcon';
import { DashboardIcon } from '@icons/DashboardIcon';
import { DoorIcon } from '@icons/DoorIcon';
import { HandIcon } from '@icons/HandIcon';
import { NetworkNodeIcon } from '@icons/NetworkNodeIcon';
import { OpenInNewIcon } from '@icons/OpenInNewIcon';
import { SavingsIcon } from '@icons/SavingsIcon';
import { useWorkersChatUrl } from '@network/useWorkersChat';

interface NetworkMenuProps {
  onItemClick: () => void;
}

const MenuItem = styled(Button)(({ theme: { palette, spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  height: spacing(7),
  width: '100%',
  minWidth: 0,

  fontWeight: 500,
  textAlign: 'center',
  padding: spacing(0, 2),
  borderRadius: 0,
  '& .leftIcon': {
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
  // ['&:hover']: {
  //   backgroundColor: palette.background.paper,
  //   color: palette.info.contrastText,
  //   // '& svg:not(.badge) path': {
  //   //   fill: 'red',
  //   // },
  //   // '& svg.badge path': {
  //   //   fill: 'inherit',
  //   // },
  // },
  // [`&.selected`]: {
  //   // backgroundColor: palette.info.main,
  //   // color: palette.info.contrastText,
  //   // '& svg:not(.badge) path': {
  //   //   fill: palette.info.contrastText,
  //   // },
  // },

  // [`&.${buttonClasses.disabled}`]: {
  //   opacity: 0.4,
  //   backgroundColor: 'transparent',
  //   color: palette.text.secondary,
  //   '& svg:not(.badge) path': {
  //     fill: palette.text.secondary,
  //   },
  // },
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
        <Box className="leftIcon" justifyContent="center" alignContent="center">
          <LeftIcon variant={active ? 'filled' : 'outlined'} />
        </Box>
        {/* <Text>{label}</Text>
        {RightIcon ? (
          <Box className="rightIcon">
            <RightIcon />
          </Box>
        ) : null} */}
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
  const { isWorkerOperator } = useIsWorkerOperator();
  const workersChatUrl = useWorkersChatUrl();

  return (
    <>
      <Item LeftIcon={DashboardIcon} label="Dashboard" onClick={onItemClick} path="/dashboard" />
      <Item LeftIcon={SavingsIcon} label="Assets" onClick={onItemClick} path="/assets" />
      <Item LeftIcon={NetworkNodeIcon} label="Workers" onClick={onItemClick} path="/workers" />
      <Item LeftIcon={HandIcon} label="Delegations" onClick={onItemClick} path="/delegations" />
      <Item LeftIcon={DoorIcon} label="Gateways" onClick={onItemClick} path="/gateways" />

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
