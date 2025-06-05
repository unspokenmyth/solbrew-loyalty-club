
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Star, Award } from "lucide-react";
import { NFT_COLLECTION_CONFIG } from "@/config/solana";

interface TierInfoProps {
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

export const TierInfo: React.FC<TierInfoProps> = ({ tier }) => {
  const TierIcon = tierIcons[tier];
  const tierConfig = NFT_COLLECTION_CONFIG[tier];

  return (
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
  );
};
