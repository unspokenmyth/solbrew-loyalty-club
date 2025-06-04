
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, ExternalLink, Copy, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WalletConnectionProps {
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const WalletConnection = ({ isConnected, onConnect, onDisconnect }: WalletConnectionProps) => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Mock wallet address for demo
  const mockWalletAddress = "7xKs...9mNp";
  const mockBalance = "1.24 SOL";

  const handleConnect = async () => {
    setIsConnecting(true);
    
    // Simulate wallet connection delay
    setTimeout(() => {
      onConnect();
      setIsConnecting(false);
      toast({
        title: "Wallet Connected",
        description: "Your Phantom wallet has been connected successfully.",
      });
    }, 1500);
  };

  const handleDisconnect = () => {
    onDisconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  const copyAddress = () => {
    navigator.clipboard.writeText("7xKs1234567890abcdef1234567890abcdef9mNp");
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
  };

  if (isConnected) {
    return (
      <div className="flex items-center space-x-3">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-amber-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">{mockWalletAddress}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyAddress}
              className="h-auto p-1 hover:bg-amber-100"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
          <div className="text-xs text-gray-500 mt-1">{mockBalance}</div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleDisconnect}
          className="border-red-200 text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4 mr-1" />
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting}
      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg"
    >
      <Wallet className="h-4 w-4 mr-2" />
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
};
