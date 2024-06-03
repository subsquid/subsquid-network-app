import { styled } from '@mui/material';
import classNames from 'classnames';

const Svg = styled('svg')({
  '&.error': {
    path: {
      fill: '#FF8F88 !important',
    },
  },
  '&.warning': {
    path: {
      fill: '#FFC83D !important',
    },
  },
});

export function WarningIcon({
  className,
  color = 'warning',
}: {
  className?: string;
  size?: number;
  color?: 'error' | 'warning';
}) {
  return (
    <Svg
      className={classNames([className, color])}
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.6344 12.4222L11.5583 1.50726C10.4499 -0.496087 7.54018 -0.490847 6.43474 1.50726L0.365954 12.4294C-0.707863 14.3648 0.711514 16.721 2.93153 16.721H15.0687C17.2821 16.721 18.7099 14.3764 17.6344 12.4222Z"
        fill="#FFC36D"
      />
      <path d="M9 5.0022L9 9.0022" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="12.0022" r="1" fill="#1D1D1F" />
    </Svg>
  );
}
