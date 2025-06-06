import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Star, Award, CheckCircle, Gift, Coffee } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const tierPrices = {
  Bronze: '0.1 SOL',
  Silver: '0.25 SOL',
  Gold: '0.5 SOL',
};

const tierImages = {
  Bronze: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop&crop=center',
  Silver: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=200&fit=crop&crop=center',
  Gold: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop&crop=center',
};

export const MintingModal: React.FC<MintingModalProps> = ({ isOpen, onClose, tier }) => {
  const [step, setStep] = useState<'confirm' | 'success'>('confirm');
  const navigate = useNavigate();
  const TierIcon = tierIcons[tier];

  const handleMint = () => {
    // Simulate minting process
    setStep('success');
  };

  const handleViewRewards = () => {
    onClose();
    navigate('/profile');
  };

  const renderConfirmStep = () => (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <TierIcon className="h-6 w-6" />
          Mint {tier} Membership NFT
        </DialogTitle>
        <DialogDescription>
          You're about to mint a {tier} tier membership NFT for {tierPrices[tier]}
        </DialogDescription>
      </DialogHeader>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${tierColors[tier]}`} />
            SolBrew {tier} Membership
          </CardTitle>
          <CardDescription>Premium coffee membership with exclusive perks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-4">
            <img 
              src={tierImages[tier]}
              alt={`${tier} membership`}
              className="w-48 h-32 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Price:</span>
              <Badge variant="secondary">{tierPrices[tier]}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Benefits:</span>
              <span className="text-sm text-muted-foreground">
                {tier === 'Bronze' && '5% discount + priority queue'}
                {tier === 'Silver' && '10% discount + free upgrades'}
                {tier === 'Gold' && '15% discount + VIP perks'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Monthly Perks:</span>
              <span className="text-sm text-muted-foreground">
                {tier === 'Bronze' && '1 free coffee'}
                {tier === 'Silver' && '2 free coffees'}
                {tier === 'Gold' && '5 free coffees'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button onClick={onClose} variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button onClick={handleMint} className="flex-1">
          Mint for {tierPrices[tier]}
        </Button>
      </div>
    </>
  );

  const renderSuccessStep = () => (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-green-600">
          <CheckCircle className="h-6 w-6" />
          NFT Minted Successfully!
        </DialogTitle>
        <DialogDescription>
          Congratulations! Your {tier} membership NFT has been minted to your wallet.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        {/* Success Image */}
        <div className="flex justify-center">
          <img 
            src={tierImages[tier]}
            alt="Coffee celebration"
            className="w-48 h-32 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Membership Details */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <TierIcon className={`h-6 w-6 text-${tier.toLowerCase()}-600`} />
              <h4 className="font-semibold text-green-800">{tier} Membership Active!</h4>
            </div>
            <div className="space-y-2 text-sm text-green-700">
              <div className="flex items-center gap-2">
                <Coffee className="h-4 w-4" />
                <span>
                  {tier === 'Bronze' && '5% discount on all beverages'}
                  {tier === 'Silver' && '10% discount + priority ordering'}
                  {tier === 'Gold' && '15% discount + VIP perks'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4" />
                <span>
                  {tier === 'Bronze' && '1 free coffee per month'}
                  {tier === 'Silver' && '2 free coffees per month'}
                  {tier === 'Gold' && '5 free coffees per month'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="h-5 w-5 text-amber-600" />
            <h4 className="font-semibold text-amber-800">Ready to enjoy your perks?</h4>
          </div>
          <p className="text-sm text-amber-700 mb-4">
            Your {tier} membership is now active! Visit your profile to see all available rewards and start saving on your coffee purchases.
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={onClose} variant="outline" className="flex-1">
          Close
        </Button>
        <Button onClick={handleViewRewards} className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600">
          <Gift className="h-4 w-4 mr-2" />
          View My Rewards
        </Button>
      </div>
    </>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        {step === 'confirm' ? renderConfirmStep() : renderSuccessStep()}
      </DialogContent>
    </Dialog>
  );
};