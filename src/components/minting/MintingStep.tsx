
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface MintingStepProps {
  tier: 'Bronze' | 'Silver' | 'Gold';
  progress: number;
}

export const MintingStep: React.FC<MintingStepProps> = ({ tier, progress }) => {
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
};
