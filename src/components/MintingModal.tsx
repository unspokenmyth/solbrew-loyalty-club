
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Crown, Award, Star, CheckCircle, Loader2 } from "lucide-react";
import { useNFTMinting } from "@/hooks/useNFTMinting";
import { NFT_COLLECTION_CONFIG } from "@/config/solana";

interface MintingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: 'Bronze' | 'Silver' | 'Gold';
}

const tierIcons = {
  Bronze: Award,
  Silver: Star,
  Gold: Crown,
};

const tierColors = {
  Bronze: 'from-amber-600 to-orange-600',
  Silver: 'from-gray-400 to-gray-600',
  Gold: 'from-yellow-400 to-yellow-600',
};

export const MintingModal: React.FC<MintingModalProps> = ({ isOpen, onClose, tier }) => {
  const { mintNFT, minting } = useNFTMinting();
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState<'confirm' | 'minting' | 'success' | 'error'>('confirm');
  const [txSignature, setTxSignature] = useState<string>('');

  const TierIcon = tierIcons[tier];
  const tierConfig = NFT_COLLECTION_CONFIG[tier];

  const handleMint = async () => {
    setStep('minting');
    setProgress(10);

    try {
      setProgress(30);
      const result = await mintNFT(tier);
      setProgress(80);
      
      if (result?.signature) {
        setTxSignature(result.signature);
        setProgress(100);
        setStep('success');
      } else {
        setStep('error');
      }
    } catch (error) {
      console.error('Minting failed:', error);
      setStep('error');
    }
  };

  const handleClose = () => {
    setStep('confirm');
    setProgress(0);
    setTxSignature('');
    onClose();
  };

  const renderContent = () => {
    switch (step) {
      case 'confirm':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <TierIcon className="h-6 w-6" />
                Mint {tier} Membership NFT
              </DialogTitle>
              <DialogDescription>
                You're about to mint a {tier} tier membership NFT for {tierConfig.price} SOL
              </DialogDescription>
            </DialogHeader>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${tierColors[tier]}`} />
                  {tierConfig.name}
                </CardTitle>
                <CardDescription>{tierConfig.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <Badge variant="secondary">{tierConfig.price} SOL</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Symbol:</span>
                    <span className="font-mono text-sm">{tierConfig.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Benefits:</span>
                    <span className="text-sm text-muted-foreground">
                      {tier === 'Bronze' && '5% discount'}
                      {tier === 'Silver' && '10% discount + priority'}
                      {tier === 'Gold' && '15% discount + VIP perks'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button onClick={handleClose} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleMint} disabled={Boolean(minting)} className="flex-1">
                {minting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Minting...
                  </>
                ) : (
                  `Mint for ${tierConfig.price} SOL`
                )}
              </Button>
            </div>
          </>
        );

      case 'minting':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin" />
                Minting Your NFT...
              </DialogTitle>
              <DialogDescription>
                Please wait while we create your {tier} membership NFT
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <Progress value={progress} className="w-full" />
              <div className="text-center text-sm text-muted-foreground">
                {progress < 30 && "Preparing transaction..."}
                {progress >= 30 && progress < 80 && "Creating NFT on blockchain..."}
                {progress >= 80 && "Finalizing..."}
              </div>
            </div>
          </>
        );

      case 'success':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                NFT Minted Successfully!
              </DialogTitle>
              <DialogDescription>
                Your {tier} membership NFT has been created and added to your wallet
              </DialogDescription>
            </DialogHeader>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <TierIcon className={`h-16 w-16 mx-auto bg-gradient-to-r ${tierColors[tier]} bg-clip-text text-transparent`} />
                  <h3 className="font-semibold">{tierConfig.name}</h3>
                  {txSignature && (
                    <p className="text-xs text-muted-foreground font-mono break-all">
                      {txSignature}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleClose} className="w-full">
              Continue
            </Button>
          </>
        );

      case 'error':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="text-red-600">Minting Failed</DialogTitle>
              <DialogDescription>
                There was an error minting your NFT. Please try again.
              </DialogDescription>
            </DialogHeader>

            <div className="flex gap-3">
              <Button onClick={handleClose} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button onClick={() => setStep('confirm')} className="flex-1">
                Try Again
              </Button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};
