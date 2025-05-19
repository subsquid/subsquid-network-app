import { PropsWithChildren } from 'react';
import { Box, Skeleton, SxProps, Theme } from '@mui/material';

export interface SkeletonWrapperProps extends PropsWithChildren {
  /** Whether the component is in a loading state */
  loading?: boolean;
  /** Custom styles for the wrapper */
  sx?: SxProps<Theme>;
  /** Width of the skeleton when loading */
  width?: number | string;
  /** Height of the skeleton when loading */
  height?: number | string;
  /** Variant of the skeleton */
  variant?: 'text' | 'rectangular' | 'circular';
}

export const SkeletonWrapper = ({
  loading = false,
  children,
  sx,
  width,
  height,
  variant,
}: SkeletonWrapperProps) => {
  if (loading) {
    return (
      <Skeleton variant={variant} width={width} height={height} sx={sx}>
        {children}
      </Skeleton>
    );
  }

  return children;
};
