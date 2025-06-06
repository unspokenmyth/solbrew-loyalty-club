
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, ExternalLink, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SuccessStepProps {
  tier: 'Bronze' | 'Silver' | 'Gold';
  txSignature: string;
  onClose: () => void;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ tier, txSignature, onClose }) => {
  const navigate = useNavigate();

  const handleViewRewards = () => {
    onClose();
    navigate('/profile');
  };

  return (
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
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop&crop=center"
            alt="Coffee celebration"
            className="w-48 h-32 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Transaction Details */}
        {txSignature && (
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Transaction Signature:</p>
            <p className="text-xs font-mono bg-white p-2 rounded border break-all">
              {txSignature}
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="h-5 w-5 text-green-600" />
            <h4 className="font-semibold text-green-800">Ready to enjoy your perks?</h4>
          </div>
          <p className="text-sm text-green-700 mb-4">
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
};
