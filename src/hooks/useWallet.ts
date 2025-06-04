
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useToast } from '@/hooks/use-toast';

export const useWallet = () => {
  const { wallet, connected, connecting, publicKey, disconnect } = useSolanaWallet();
  const { setVisible } = useWalletModal();
  const { toast } = useToast();

  const connect = () => {
    try {
      setVisible(true);
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Failed to open wallet connection modal",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = () => {
    try {
      disconnect();
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected successfully",
      });
    } catch (error) {
      toast({
        title: "Disconnection Error", 
        description: "Failed to disconnect wallet",
        variant: "destructive",
      });
    }
  };

  return {
    wallet,
    connected,
    connecting,
    publicKey,
    connect,
    disconnect: handleDisconnect,
    walletAddress: publicKey?.toString(),
  };
};
