
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { QrCode, Download, Copy, RefreshCw } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { useToast } from "@/hooks/use-toast";

// Simple QR Code generator (for production, use a library like qrcode)
const generateQRCodeDataURL = (text: string): string => {
  // This is a placeholder implementation
  // In production, use a proper QR code library like 'qrcode' or 'qrcode-generator'
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const size = 200;
  
  canvas.width = size;
  canvas.height = size;
  
  if (ctx) {
    // Create a simple placeholder QR code pattern
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    
    ctx.fillStyle = '#000000';
    const blockSize = size / 25;
    
    // Create a simple pattern (not a real QR code)
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        if ((i + j) % 3 === 0 || (i * j) % 7 === 0) {
          ctx.fillRect(i * blockSize, j * blockSize, blockSize, blockSize);
        }
      }
    }
    
    // Add corner markers
    ctx.fillRect(0, 0, blockSize * 7, blockSize * 7);
    ctx.fillRect(size - blockSize * 7, 0, blockSize * 7, blockSize * 7);
    ctx.fillRect(0, size - blockSize * 7, blockSize * 7, blockSize * 7);
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(blockSize, blockSize, blockSize * 5, blockSize * 5);
    ctx.fillRect(size - blockSize * 6, blockSize, blockSize * 5, blockSize * 5);
    ctx.fillRect(blockSize, size - blockSize * 6, blockSize * 5, blockSize * 5);
    
    ctx.fillStyle = '#000000';
    ctx.fillRect(blockSize * 2, blockSize * 2, blockSize * 3, blockSize * 3);
    ctx.fillRect(size - blockSize * 5, blockSize * 2, blockSize * 3, blockSize * 3);
    ctx.fillRect(blockSize * 2, size - blockSize * 5, blockSize * 3, blockSize * 3);
  }
  
  return canvas.toDataURL();
};

interface QRCodeDisplayProps {
  walletAddress: string;
  onRegenerate: () => void;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ walletAddress, onRegenerate }) => {
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (walletAddress) {
      const dataURL = generateQRCodeDataURL(walletAddress);
      setQrCodeDataURL(dataURL);
    }
  }, [walletAddress]);

  const handleDownload = () => {
    if (qrCodeDataURL) {
      const link = document.createElement('a');
      link.download = `solbrew-wallet-qr-${Date.now()}.png`;
      link.href = qrCodeDataURL;
      link.click();
      
      toast({
        title: "QR Code Downloaded",
        description: "Your wallet QR code has been saved to your device",
      });
    }
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy address to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          Your Wallet QR Code
        </CardTitle>
        <CardDescription>
          Show this QR code to coffee shop staff for quick verification
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {qrCodeDataURL && (
          <div className="flex justify-center">
            <div className="p-4 bg-white rounded-lg border-2 border-gray-200">
              <img 
                src={qrCodeDataURL} 
                alt="Wallet QR Code" 
                className="w-48 h-48"
              />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Wallet Address</label>
          <div className="flex items-center gap-2">
            <Input 
              value={walletAddress} 
              readOnly 
              className="font-mono text-xs"
            />
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleCopyAddress}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleDownload} className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download QR
          </Button>
          <Button onClick={onRegenerate} variant="outline" className="flex-1">
            <RefreshCw className="h-4 w-4 mr-2" />
            Regenerate
          </Button>
        </div>

        <div className="text-xs text-gray-500 text-center">
          <p>💡 Pro tip: Save this QR code to your phone for quick access at the coffee shop</p>
        </div>
      </CardContent>
    </Card>
  );
};

export const QRCodeGenerator: React.FC = () => {
  const { walletAddress, connected } = useWallet();
  const [customAddress, setCustomAddress] = useState('');
  const [useCustomAddress, setUseCustomAddress] = useState(false);
  const [regenerateKey, setRegenerateKey] = useState(0);

  const handleRegenerate = () => {
    setRegenerateKey(prev => prev + 1);
  };

  const handleToggleCustom = () => {
    setUseCustomAddress(!useCustomAddress);
    setCustomAddress('');
  };

  const displayAddress = useCustomAddress ? customAddress : (walletAddress || '');

  if (!connected && !useCustomAddress) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            QR Code Generator
          </CardTitle>
          <CardDescription>
            Connect your wallet or enter a custom address to generate a QR code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8">
            <QrCode className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No wallet connected</p>
            <div className="space-y-2">
              <Button onClick={handleToggleCustom} variant="outline">
                Use Custom Address
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>QR Code Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant={useCustomAddress ? "secondary" : "default"}>
              {useCustomAddress ? "Custom Address" : "Connected Wallet"}
            </Badge>
            <Button onClick={handleToggleCustom} variant="outline" size="sm">
              {useCustomAddress ? "Use Connected Wallet" : "Use Custom Address"}
            </Button>
          </div>

          {useCustomAddress && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Custom Wallet Address</label>
              <Input
                placeholder="Enter wallet address..."
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                className="font-mono"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* QR Code Display */}
      {displayAddress && (
        <QRCodeDisplay
          key={regenerateKey}
          walletAddress={displayAddress}
          onRegenerate={handleRegenerate}
        />
      )}

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">How to Use Your QR Code</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-medium">At the Coffee Shop</p>
                <p className="text-gray-600">Show your QR code to the barista when ordering</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-medium">Staff Verification</p>
                <p className="text-gray-600">Staff will scan or manually verify your wallet address</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-medium">Enjoy Benefits</p>
                <p className="text-gray-600">Receive your tier-based discounts and perks instantly</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
