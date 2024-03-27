import React from 'react';

import { styled, Tab, TabProps, Tabs } from '@mui/material';
import classnames from 'classnames';
import trimEnd from 'lodash-es/trimEnd';
import { useLocation, useNavigate } from 'react-router-dom';

export const PageTabsRoot = styled(Tabs, {
  name: 'PageTabs',
})(({ theme }) => ({
  marginBottom: theme.spacing(3),
  maxWidth: '100%',

  [theme.breakpoints.down('xxs')]: {
    marginBottom: theme.spacing(2),
    // margin: theme.spacing(0, -2, 2),
    // padding: theme.spacing(0, 2),
  },
}));

export type PageTab = {
  title: React.ReactNode;
  path: string;
  disabled?: boolean;
};

const PageTab = styled(Tab, { name: 'PageTab' })(({ theme }) => ({}));

export const PageTabs = ({
  tabs,
  prefix = '',
  TabComponent = Tab,
}: {
  tabs: PageTab[];
  prefix?: string;
  TabComponent?: React.ElementType<TabProps>;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = trimEnd(location.pathname, '/');

  return (
    <PageTabsRoot variant="scrollable" allowScrollButtonsMobile={false}>
      {tabs.map(({ title, path, disabled }) => {
        const linkPath = `${prefix}${path}`;
        const active = currentPath === linkPath;

        return (
          <TabComponent
            key={linkPath}
            className={classnames({
              selected: active,
            })}
            onClick={() => navigate(linkPath)}
            disabled={disabled}
            data-before={title}
            label={title}
          />
        );
      })}
    </PageTabsRoot>
  );
};
