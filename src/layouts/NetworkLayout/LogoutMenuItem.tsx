import React from 'react';

import { LogoutIcon } from '@icons/LogoutIcon';

import { useAppReload } from '../../index.tsx';

import { BasicMenuItem } from './BasicMenuItem';

export function LogoutMenuItem() {
  const reload = useAppReload({ to: '/' });

  return <BasicMenuItem LeftIcon={LogoutIcon} label="Disconnect" onClick={() => reload()} />;
}
