
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Crown, Star, Award } from "lucide-react";
import { NFT_COLLECTION_CONFIG } from "@/config/solana";

interface SuccessStepProps {
  tier: 'Bronze' | 'Silver' | 'Gold';
  txSignature: string;
  onClose: () => void;
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

export const SuccessStep: React.FC<SuccessStepProps> = ({ tier, txSignature, onClose }) => {
  const TierIcon = tierIcons[tier];
  const tierConfig = NFT_COLLECTION_CONFIG[tier];

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

      <Button onClick={onClose} className="w-full">
        Continue
      </Button>
    </>
  );
};
