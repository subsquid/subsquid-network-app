import { Report } from '@mui/icons-material';
import { Alert, AlertColor, Box, CircularProgress, Typography } from '@mui/material';
import toast, { Toaster as Toaster_, Toast } from 'react-hot-toast';

export function Toaster() {
  return (
    <Toaster_
      position="bottom-right"
      gutter={8}
      toastOptions={{ duration: 2000 }}
      reverseOrder={true}
    >
      {(t: Toast) => {
        const content = typeof t.message === 'function' ? t.message(t) : t.message;

        const { color, icon } =
          t.type === 'error'
            ? { color: 'error', icon: <Report color="error" /> }
            : t.type === 'success'
              ? { color: 'success' }
              : t.type === 'loading'
                ? {
                    color: 'info',
                    icon: (
                      <Box display="flex" alignItems="center">
                        <CircularProgress size={20} color="info" />
                      </Box>
                    ),
                  }
                : {};

        return (
          <Alert
            hidden={!t.visible}
            icon={icon}
            color={color as AlertColor}
            onClose={() => {
              t.onClose?.();
              toast.remove(t.id);
            }}
          >
            <Typography>{content}</Typography>
          </Alert>
        );
      }}
    </Toaster_>
  );
}
