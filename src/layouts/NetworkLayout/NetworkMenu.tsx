import React, { ForwardedRef, forwardRef } from 'react';

import {
  ArrowOutwardOutlined,
  BackHand,
  BackHandOutlined,
  Dashboard,
  DashboardOutlined,
  Lan,
  LanOutlined,
  Savings,
  SavingsOutlined,
  SensorDoor,
  SensorDoorOutlined,
  SmsOutlined,
} from '@mui/icons-material';
import { Button, styled } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import { useIsWorkerOperator } from '@api/subsquid-network-squid';
import { demoFeaturesEnabled } from '@hooks/demoFeaturesEnabled';
import { useWorkersChatUrl } from '@network/useWorkersChat';

interface NetworkMenuProps {
  onItemClick: () => void;
}

const MenuItem = styled(Button)(({ theme: { palette, spacing, breakpoints, typography } }) => ({
  ...typography.subtitle2,

  height: spacing(7),
  display: 'flex',
  justifyContent: 'flex-start',

  padding: spacing(0, 3),
  borderRadius: 0,
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
      LeftIcon: React.ReactNode | ((active: boolean) => React.ReactNode);
      RightIcon?: React.ReactNode | ((active: boolean) => React.ReactNode);
      label?: string;
      onClick?: () => void;
    },
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const location = useLocation();
    const active = forceActive || (!forceInactive && location.pathname.startsWith(path));

    // const theme = useTheme();
    // const compact = useMediaQuery(theme.breakpoints.down('xl'));
    // const mobile = useMediaQuery(theme.breakpoints.down('xs'));

    // LeftIcon.props.on = active;

    const startIcon = typeof LeftIcon === 'function' ? LeftIcon(active) : LeftIcon;
    const endIcon = typeof RightIcon === 'function' ? RightIcon(active) : RightIcon;

    return (
      <MenuItem
        startIcon={<span>{startIcon}</span>}
        endIcon={<span>{endIcon}</span>}
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
        {/* {!compact || mobile ? (
      <>
        
        ) : null}
      </>
     */}
        {label}
      </MenuItem>
    );
  },
  // <Link to={path} target={target} rel={target ? 'noreferrer' : undefined}>
  // { button }
  // </Link>
);

export const NetworkMenu = ({ onItemClick }: NetworkMenuProps) => {
  const { isWorkerOperator } = useIsWorkerOperator();
  const workersChatUrl = useWorkersChatUrl();

  return (
    <>
      <Item
        LeftIcon={active => (active ? <Dashboard /> : <DashboardOutlined />)}
        label="Dashboard"
        onClick={onItemClick}
        path="/dashboard"
      />
      <Item
        LeftIcon={active => (active ? <Savings /> : <SavingsOutlined />)}
        label="Assets"
        onClick={onItemClick}
        path="/assets"
      />
      <Item
        LeftIcon={active => (active ? <Lan /> : <LanOutlined />)}
        label="Workers"
        onClick={onItemClick}
        path="/workers"
      />
      <Item
        LeftIcon={active => (active ? <BackHand /> : <BackHandOutlined />)}
        label="Delegations"
        onClick={onItemClick}
        path="/delegations"
      />
      {demoFeaturesEnabled() && (
        <Item
          LeftIcon={active => (active ? <SensorDoor /> : <SensorDoorOutlined />)}
          label="Portals"
          onClick={onItemClick}
          path="/portals"
        />
      )}

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
          LeftIcon={<SmsOutlined />}
          RightIcon={<ArrowOutwardOutlined />}
        />
      ) : null}
      <Item
        label="Community Chat"
        path={process.env.DISCORD_API_URL || '/null'}
        target="_blank"
        LeftIcon={<SmsOutlined />}
        RightIcon={<ArrowOutwardOutlined />}
      />
    </>
  );
};
