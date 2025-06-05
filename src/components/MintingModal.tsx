
import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNFTMinting } from "@/hooks/useNFTMinting";
import { ConfirmStep } from "./minting/ConfirmStep";
import { MintingStep } from "./minting/MintingStep";
import { SuccessStep } from "./minting/SuccessStep";
import { ErrorStep } from "./minting/ErrorStep";

interface MintingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: 'Bronze' | 'Silver' | 'Gold';
}

export const MintingModal: React.FC<MintingModalProps> = ({ isOpen, onClose, tier }) => {
  const { mintNFT, minting } = useNFTMinting();
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState<'confirm' | 'minting' | 'success' | 'error'>('confirm');
  const [txSignature, setTxSignature] = useState<string>('');

  const handleMint = async () => {
    setStep('minting');
    setProgress(10);

    try {
      setProgress(30);
      const result = await mintNFT(tier);
      setProgress(80);
      
      if (result?.signature) {
        // Convert Uint8Array signature to base64 string
        const signatureString = typeof result.signature === 'string' 
          ? result.signature 
          : Buffer.from(result.signature).toString('base64');
        setTxSignature(signatureString);
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

  const handleRetry = () => {
    setStep('confirm');
  };

  const renderContent = () => {
    switch (step) {
      case 'confirm':
        return (
          <ConfirmStep
            tier={tier}
            minting={Boolean(minting)}
            onMint={handleMint}
            onClose={handleClose}
          />
        );

      case 'minting':
        return <MintingStep tier={tier} progress={progress} />;

      case 'success':
        return (
          <SuccessStep
            tier={tier}
            txSignature={txSignature}
            onClose={handleClose}
          />
        );

      case 'error':
        return <ErrorStep onRetry={handleRetry} onClose={handleClose} />;

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
