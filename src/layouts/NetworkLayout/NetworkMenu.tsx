import React, { ForwardedRef, forwardRef } from 'react';

import { Box, Button, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import { useIsWorkerOperator } from '@api/subsquid-network-squid';
import { ContactsIcon } from '@icons/ContactsIcon';
import { DashboardIcon } from '@icons/DashboardIcon';
import { HandIcon } from '@icons/HandIcon';
import { NetworkNodeIcon } from '@icons/NetworkNodeIcon';
import { OpenInNewIcon } from '@icons/OpenInNewIcon';
import { SavingsIcon } from '@icons/SavingsIcon';
import { useWorkersChatUrl } from '@network/useWorkersChat';

interface NetworkMenuProps {
  onItemClick: () => void;
}

const MenuItem = styled(Button)(({ theme: { palette, spacing, breakpoints } }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: spacing(7),
  minWidth: 0,

  padding: spacing(0),
  [breakpoints.up('xl')]: {
    justifyContent: 'flex-start',
    padding: spacing(0, 2.5),
  },

  borderRadius: 0,
  '& .leftIcon': {
    display: 'flex',
    alignItems: 'center',
    marginRight: spacing(0),

    [breakpoints.up('xl')]: {
      marginRight: spacing(1.5),
    },
  },

  '& .rightIcon': {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing(1),
  },
  // '& svg:not(.badge) path': {
  //   transition: 'fill 300ms ease-out',
  // },
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

    const theme = useTheme();
    const compact = useMediaQuery(theme.breakpoints.down('xl'));

    const button = (
      <MenuItem
        ref={ref}
        onClick={onClick}
        className={active ? 'selected' : undefined}
        disabled={disabled}
        // @ts-expect-error: satisfy the compiler
        component={Link}
        to={path}
        target={target}
        rel={target ? 'noreferrer' : undefined}
      >
        <Box className="leftIcon">
          <LeftIcon variant={active ? 'filled' : 'outlined'} />
        </Box>
        {!compact ? (
          <>
            <Typography variant="subtitle2">{label}</Typography>
            {RightIcon ? (
              <Box className="rightIcon">
                <RightIcon />
              </Box>
            ) : null}
          </>
        ) : null}
      </MenuItem>
    );

    if (disabled) return button;

    return button;
    // <Link to={path} target={target} rel={target ? 'noreferrer' : undefined}>
    // { button }
    // </Link>
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
      {/* <Item LeftIcon={DoorIcon} label="Gateways" onClick={onItemClick} path="/gateways" /> */}

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
          label="Operators Chat"
          path={workersChatUrl || '/null'}
          target="_blank"
          LeftIcon={ContactsIcon}
          RightIcon={OpenInNewIcon}
        />
      ) : null}
      <Item
        label="Community Chat"
        path={process.env.DISCORD_API_URL || '/null'}
        target="_blank"
        LeftIcon={ContactsIcon}
        RightIcon={OpenInNewIcon}
      />
    </>
  );
};
