
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Crown, Star, Award } from "lucide-react";
import { TierInfo } from "./TierInfo";
import { NFT_COLLECTION_CONFIG } from "@/config/solana";

interface ConfirmStepProps {
  tier: 'Bronze' | 'Silver' | 'Gold';
  minting: boolean;
  onMint: () => void;
  onClose: () => void;
}

const tierIcons = {
  Bronze: Award,
  Silver: Star,
  Gold: Crown,
};

export const ConfirmStep: React.FC<ConfirmStepProps> = ({ tier, minting, onMint, onClose }) => {
  const TierIcon = tierIcons[tier];
  const tierConfig = NFT_COLLECTION_CONFIG[tier];

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

      <TierInfo tier={tier} />

      <div className="flex gap-3">
        <Button onClick={onClose} variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button onClick={onMint} disabled={minting} className="flex-1">
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
};
