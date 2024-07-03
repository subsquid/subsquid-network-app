import React, { useRef, useState } from 'react';

import { IconButton, Stack, styled } from '@mui/material';
import { Box } from '@mui/system';
import { alpha } from '@mui/system/colorManipulator';
import classnames from 'classnames';

import { CopyIcon } from '@icons/CopyIcon';

import { CopyToClipboardTooltip } from './CopyToClipboardTooltip';

export const Wrapper = styled(Stack)(({ theme }) => ({
  '& .copyButton': {
    // marginTop: theme.spacing(-1),
    padding: 0,
    backgroundColor: 'transparent',
  },
  '&.gutterBottom': {
    marginBottom: theme.spacing(1.5),
  },
  '&.bordered': {
    fontFamily: `'JetBrains Mono', monospace`,
    fontSize: '1rem',
    position: 'relative',
    display: 'inline-block',
    background: alpha(theme.palette.info.main, 0.2),
    border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
    borderRadius: 4,
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(1, '45px', 1, 1.5),
    wordBreak: 'break-word',
    // boxSizing: 'border-box',
    maxWidth: '100%',
    '& .copyButton': {
      position: 'absolute',
      right: theme.spacing(1.5),
      top: theme.spacing(1.5),
    },
  },
  '&.fullWidth': {
    display: 'block',
  },
  '& .nowrap': {
    whiteSpace: 'nowrap',
  },
}));

export const CopyToClipboard = ({
  text,
  content,
  copyButtonSize = 16,
  bordered = false,
  fullWidth = false,
  gutterBottom = false,
}: {
  text: string;
  content?: React.ReactNode;
  copyButtonSize?: number;
  bordered?: boolean;
  fullWidth?: boolean;
  gutterBottom?: boolean;
}) => {
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);

  if (!text) return null;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setCopied(true);
    navigator.clipboard.writeText(text);
  };

  const handleSelect = () => {
    if (!ref.current) return;

    window.getSelection()?.selectAllChildren(ref.current);
  };

  return (
    <Wrapper
      className={classnames({
        bordered,
        fullWidth,
        gutterBottom,
      })}
      direction="row"
      alignItems="center"
      spacing={1}
      // onClick={handleSelect}
    >
      <Box
        className="content"
        ref={ref}
        // onClick={handleSelect}
      >
        {content || text}
      </Box>
      <CopyToClipboardTooltip copied={copied} setCopied={setCopied}>
        <IconButton size="small" className="copyButton" onClick={handleClick}>
          <CopyIcon size={copyButtonSize} />
        </IconButton>
      </CopyToClipboardTooltip>
    </Wrapper>
  );
};
