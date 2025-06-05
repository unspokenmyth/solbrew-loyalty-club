
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ErrorStepProps {
  onRetry: () => void;
  onClose: () => void;
}

export const ErrorStep: React.FC<ErrorStepProps> = ({ onRetry, onClose }) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-red-600">Minting Failed</DialogTitle>
        <DialogDescription>
          There was an error minting your NFT. Please try again.
        </DialogDescription>
      </DialogHeader>

      <div className="flex gap-3">
        <Button onClick={onClose} variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button onClick={onRetry} className="flex-1">
          Try Again
        </Button>
      </div>
    </>
  );
};
