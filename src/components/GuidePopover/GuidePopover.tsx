import React, { PropsWithChildren } from 'react';

import { Box, Button, Popover, popoverClasses, Stack, styled } from '@mui/material';

const Guide = styled(Popover, {
  name: 'Guide',
})(({ theme }) => ({
  zIndex: theme.zIndex.guide.content,
  [`& .${popoverClasses.paper}`]: {
    padding: theme.spacing(2.5),
    fontSize: '0.875rem',
    background: theme.palette.accent.main,
    width: 360,
    lineHeight: 1.7,
    overflow: 'visible',
  },
}));

const GuideProgress = styled('div', {
  name: 'GuideProgress',
})(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
}));

const GuideTitle = styled('span', {
  name: 'GuideTitle',
})(({ theme }) => ({
  marginLeft: theme.spacing(1.5),
  fontSize: '0.875rem',
  fontWeight: 700,
}));

const GuideActions = styled(Stack, {
  name: 'GuideActions',
})(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const GuideButton = styled(Button, {
  name: 'GuideButton',
})(({ theme }) => ({
  fontSize: '0.75rem',
  padding: theme.spacing(0, 1),
  minHeight: 24,
  minWidth: 'auto',
  '&.MuiButton-text': {
    color: theme.palette.accent.contrastText,
  },
  '&.MuiButton-contained': {
    backgroundColor: theme.palette.accent.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.accent.dark,
    },
  },
}));

const GuideArrow = styled('div', {
  name: 'GuideArrow',
})(({ theme }) => ({
  width: 0,
  height: 0,
  position: 'absolute',
  top: '100%',
  borderStyle: 'solid',
  // background: theme.palette.accent.main,

  // transform: 'rotate(45deg)',

  '&.left': {
    top: 30,
    left: '0%',
    borderWidth: '8px 8px 8px 0',
    borderColor: `transparent ${theme.palette.accent.main} transparent transparent`,
    marginTop: -8,
    marginLeft: -8,
  },
  '&.bottom': {
    top: '100%',
    left: '50%',
    borderWidth: '8px 8px 0 8px',
    borderColor: `${theme.palette.accent.main} transparent transparent transparent`,
  },
  '&.right': {
    top: 24,
    left: '100%',
    borderWidth: '8px 0 8px 8px',
    borderColor: `transparent transparent transparent ${theme.palette.accent.main}`,
    marginTop: -8,
  },
}));

const margin = 24;

export interface GuidePopoverBounding {
  arrow?: 'left' | 'right' | 'bottom';
  horizontal?: 'right' | 'center' | 'left';
  open?: boolean;
  position: { left: number; top: number };
  vertical?: 'top' | 'center' | 'bottom';
}

interface GuidePopoverProps extends PropsWithChildren, GuidePopoverBounding {
  curStepIndex: number;
  isFirst: boolean;
  isLast: boolean;
  next: () => void;
  prev: () => void;
  skip: () => void;
  stepsLength: number;
  title?: string;
}

export const GuidePopover = (props: GuidePopoverProps) => {
  const {
    arrow,
    children,
    curStepIndex,
    horizontal = 'right',
    isFirst,
    isLast,
    next,
    open = true,
    position,
    prev,
    skip,
    stepsLength,
    title,
    vertical = 'center',
  } = props;

  return (
    <Guide
      anchorReference="anchorPosition"
      anchorPosition={{
        top: position.top - (arrow === 'bottom' ? margin : 0),
        left: position.left + (arrow === 'left' ? margin : 0) - (arrow === 'right' ? margin : 0),
      }}
      elevation={0}
      transformOrigin={{
        vertical,
        horizontal,
      }}
      open={open}
    >
      <GuideArrow className={arrow} />

      <GuideProgress>
        {curStepIndex + 1} / {stepsLength - 1}
        <GuideTitle>{title}</GuideTitle>
      </GuideProgress>
      {children}
      <GuideActions spacing={1.5} direction="row" alignItems="center" justifyContent="flex-end">
        <GuideButton sx={{ ml: -1 }} variant="text" onClick={skip}>
          Skip tour
        </GuideButton>
        <Box sx={{ flex: 1 }} />
        {!isFirst && (
          <GuideButton onClick={prev} variant="contained">
            Prev
          </GuideButton>
        )}
        <GuideButton onClick={next} variant="contained">
          {isLast ? 'Finish' : 'Next'}
        </GuideButton>
      </GuideActions>
    </Guide>
  );
};
