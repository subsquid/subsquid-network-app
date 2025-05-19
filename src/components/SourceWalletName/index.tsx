import { Box, Stack, styled, Typography, Skeleton, SxProps } from '@mui/material';
import { Avatar } from '@components/Avatar';
import { SkeletonWrapper } from '@components/SkeletonWrapper';

const Name = styled(Box, {
  name: 'Name',
})(({ theme }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

export interface NameWithAvatarProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  avatarValue?: string;
  loading?: boolean;
  sx?: SxProps;
}

export function NameWithAvatar({ title, subtitle, avatarValue, loading, sx }: NameWithAvatarProps) {
  return (
    <Box sx={{ width: { xs: 200, sm: 240 }, ...sx }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <SkeletonWrapper loading={loading} variant="circular">
          <Avatar name={title?.toString() || ''} colorDiscriminator={avatarValue || ''} />
        </SkeletonWrapper>
        <Box sx={{ overflow: 'hidden' }}>
          <SkeletonWrapper width={160} loading={loading}>
            <Name>{title}</Name>
          </SkeletonWrapper>
          <SkeletonWrapper width={120} loading={loading}>
            <Typography variant="caption">{subtitle}</Typography>
          </SkeletonWrapper>
        </Box>
      </Stack>
    </Box>
  );
}
