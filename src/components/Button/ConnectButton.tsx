import { LoginOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useConnectModal } from '@rainbow-me/rainbowkit';

function ConnectButton() {
  const { openConnectModal, connectModalOpen } = useConnectModal();

  return (
    <LoadingButton
      loading={connectModalOpen}
      startIcon={<LoginOutlined />}
      onClick={() => {
        openConnectModal?.();
      }}
      variant="contained"
      color="info"
    >
      CONNECT WALLET
    </LoadingButton>
  );
}

export default ConnectButton;
