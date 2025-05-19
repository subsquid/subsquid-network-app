import { SkeletonWrapper } from '@components/SkeletonWrapper';
import { Report, Warning } from '@mui/icons-material';
import { Box, Stack, styled, Tooltip } from '@mui/material';
import { satisfies } from 'semver';

export const WorkerVersionName = styled(Box, {
  name: 'WorkerVersionName',
})(() => ({
  display: 'flex',
  whiteSpace: 'nowrap',
}));

export const WorkerVersion = ({
  version,
  minimalWorkerVersion,
  recommendedWorkerVersion,
  loading,
}: {
  version?: string;
  minimalWorkerVersion?: string;
  recommendedWorkerVersion?: string;
  loading?: boolean;
}) => {
  return (
    <SkeletonWrapper loading={loading}>
      <Stack spacing={1} direction="row" alignItems="flex-start">
        <WorkerVersionName>{version ?? '-'}</WorkerVersionName>
        {!loading && version && (
          <Box display="flex">
            {!satisfies(version, recommendedWorkerVersion || '', {
              includePrerelease: true,
            }) ? (
              !satisfies(version, minimalWorkerVersion || '', { includePrerelease: true }) ? (
                <Tooltip title="Unsupported" placement="top">
                  <Report color="error" />
                </Tooltip>
              ) : (
                <Tooltip title="Outdated" placement="top">
                  <Warning color="warning" />
                </Tooltip>
              )
            ) : null}
          </Box>
        )}
      </Stack>
    </SkeletonWrapper>
  );
};
