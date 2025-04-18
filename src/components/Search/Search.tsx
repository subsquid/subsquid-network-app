import React, { useCallback, useState } from 'react';

import { Box, styled } from '@mui/material';

import { TextField } from '@components/Form';
import { SearchIcon } from '@icons/SearchIcon';

export const Field = styled(TextField)(({ theme }) => ({
  // background: theme.palette.background.default,
  [`& .MuiInputBase-root`]: {
    padding: theme.spacing(0, 1),
    borderRadius: 360,
    border: 'none',
  },
  // '& svg': {
  //   position: 'absolute',
  // },
  '& input': {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(1),
    minHeight: 28,
  },
}));

export const Search = ({
  value,
  onChange,
  fullWidth,
  placeholder,
}: {
  loading?: boolean;
  value?: string;
  onChange?: (value: string) => unknown;
  fullWidth?: boolean;
  placeholder?: string;
}) => {
  const [realTimeValue, setRealTimeValue] = useState(value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const handleChange = useCallback(
  //   debounce(value => {
  //     onChange?.(value);
  //   }, 200),
  //   [onChange],
  // );
  const handleChange = useCallback((value: string) => onChange?.(value), [onChange]);

  return (
    <Box sx={{ flex: fullWidth ? 1 : '0 0 200px', position: 'relative' }}>
      <Field
        placeholder={placeholder}
        variant="filled"
        inputMode="search"
        className="paper"
        value={realTimeValue}
        size="small"
        fullWidth={fullWidth}
        autoComplete="off"
        onChange={e => {
          const value = e.target.value;
          setRealTimeValue(value);
          handleChange(value);
        }}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
      />
      {/*<CircularProgress*/}
      {/*  size={20}*/}
      {/*  sx={{*/}
      {/*    position: 'absolute',*/}
      {/*    top: 8,*/}
      {/*    right: 8,*/}
      {/*    opacity: loading ? 1 : 0,*/}
      {/*    transition: 'opacity 300ms ease-out',*/}
      {/*  }}*/}
      {/*/>*/}
    </Box>
  );
};
