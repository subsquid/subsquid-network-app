import React, { forwardRef } from 'react';

import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  menuItemClasses,
  styled,
  Typography,
} from '@mui/material';
import classnames from 'classnames';

const Item = styled(MenuItem)(({ theme }) => ({
  // height: '40px',
  transition: 'all ease-out 150ms',
  // paddingLeft: theme.spacing(1.5),
  // paddingRight: theme.spacing(1),
  borderRadius: '4px',
  '& path': {
    transition: 'fill ease-out 150ms',
  },
  [`&:hover, &.hovered`]: {
    backgroundColor: theme.palette.primary.main,
    // color: theme.palette.primary.contrastText,
  },
  [`& .${menuItemClasses.selected}`]: {},
  [`& .MuiListItemIcon-root`]: {
    minWidth: 32,
  },
}));

const Text = styled(ListItemText)(() => ({
  // [`& .${listItemTextClasses.primary}`]: {
  //   fontSize: '0.875rem',
  // },
}));

export const BasicMenuItem = forwardRef(
  (
    {
      LeftIcon,
      RightIcon,
      label,
      onClick,
      disabled,
      hovered,
    }: {
      onClick?: (event: React.MouseEvent<HTMLElement>) => unknown;
      label: React.ReactNode;
      LeftIcon: any;
      RightIcon?: any;
      disabled?: boolean;
      hovered?: boolean;
    },
    ref: any,
  ) => {
    return (
      <Item
        ref={ref}
        className={classnames({
          hovered,
        })}
        onClick={onClick}
        disabled={disabled}
      >
        <ListItemIcon>
          <LeftIcon />
        </ListItemIcon>
        <Typography>{label}</Typography>
        {RightIcon ? <RightIcon sx={{ opacity: 0.4 }} /> : null}
      </Item>
    );
  },
);
