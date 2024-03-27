import React, { useCallback, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Box, styled } from '@mui/material';

import { TextField } from '@components/Form';

export const Field = styled(TextField)(() => ({
  // background: theme.palette.background.default,
  borderWidth: 0,
  [`& .MuiInputBase-root`]: {
    paddingLeft: 10,
  },
  // '& svg': {
  //   position: 'absolute',
  // },
  '& input': {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 5,
    minHeight: 36,
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
    <Box sx={{ flex: fullWidth ? '1' : '0 0 200px', position: 'relative' }}>
      <Field
        placeholder={placeholder}
        variant="filled"
        className="paper"
        value={realTimeValue}
        size="small"
        fullWidth={fullWidth}
        onChange={e => {
          const value = e.target.value;
          setRealTimeValue(value);
          handleChange(value);
        }}
        InputProps={{
          startAdornment: <SearchIcon sx={{ width: 20, height: 20, opacity: 0.5 }} />,
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
