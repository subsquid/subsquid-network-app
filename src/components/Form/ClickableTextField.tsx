import React from 'react';

import { Box, IconButton, styled, SxProps, TextField } from '@mui/material';
import classnames from 'classnames';

import { EditIcon } from '@icons/EditIcon';

export const ClickableInput = styled(Box, {
  name: 'ClickableInput',
})(() => ({
  cursor: 'pointer !important',
}));

export const ClickableIconButton = styled(IconButton, {
  name: 'ClickableIconButton',
})(() => ({
  boxSizing: 'content-box',
  padding: 0,
  width: 36,
  height: 36,
}));

export const StyledTextField = styled(TextField, {
  name: 'ClickableTextField',
})(({ theme }) => ({
  '& > div': {
    backgroundColor: `${theme.palette.background.input} !important`,
    border: `1px solid ${theme.palette.background.default}`,
    '&:hover': {
      backgroundColor: `${theme.palette.background.input} !important`,
    },

    '& input': {
      color: `${theme.palette.text.primary} !important`,
      textFillColor: `${theme.palette.text.primary} !important`,
      cursor: 'pointer !important',
    },
  },

  '&.disabled': {
    '& input': {
      cursor: 'default !important',
      opacity: `0.5 !important`,
    },

    '&:hover > div': {
      border: `1px solid ${theme.palette.background.default}`,
    },
  },

  '& .MuiFormLabel-root.Mui-focused': {
    color: theme.palette.primary.main,
  },

  '& svg': {
    stroke: theme.palette.primary.main,
  },
}));

export const ClickableTextField = ({
  label,
  value,
  onClick,
  endIcon,
  disabled = false,
}: {
  label: string;
  value?: string;
  onClick?: () => unknown;
  endIcon?: React.ReactElement;
  disabled?: boolean;
}) => {
  const editable = !disabled;

  return (
    <ClickableInput onClick={onClick}>
      <StyledTextField
        label={label}
        fullWidth
        variant="filled"
        value={value}
        disabled
        className={classnames({
          disabled: !editable,
        })}
        InputLabelProps={{
          focused: Boolean(value),
          shrink: Boolean(value),
        }}
        InputProps={{
          endAdornment: onClick ? (
            <ClickableIconButton onClick={onClick}>
              {endIcon || <EditIcon />}
            </ClickableIconButton>
          ) : undefined,
        }}
      />
    </ClickableInput>
  );
};
