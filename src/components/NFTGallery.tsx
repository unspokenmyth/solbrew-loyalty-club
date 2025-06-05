
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Coffee, Crown, Award, Star, ExternalLink, Copy, Check } from "lucide-react";
import { useUserNFTs } from "@/hooks/useUserNFTs";
import { useToast } from "@/hooks/use-toast";

interface NFTCardProps {
  nft: {
    mint: string;
    name: string;
    tier: 'Bronze' | 'Silver' | 'Gold' | null;
  };
  onClick: () => void;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, onClick }) => {
  const tierIcons = {
    Bronze: Award,
    Silver: Star,
    Gold: Crown,
  };

  const tierColors = {
    Bronze: 'from-amber-500 to-orange-500',
    Silver: 'from-gray-400 to-gray-600',
    Gold: 'from-yellow-400 to-yellow-600',
  };

  const TierIcon = nft.tier ? tierIcons[nft.tier] : Coffee;
  const gradientColor = nft.tier ? tierColors[nft.tier] : 'from-gray-400 to-gray-600';

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-full bg-gradient-to-r ${gradientColor}`}>
            <TierIcon className="h-6 w-6 text-white" />
          </div>
          {nft.tier && (
            <Badge variant="secondary" className="text-xs">
              {nft.tier}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h3 className="font-semibold text-sm line-clamp-2">{nft.name}</h3>
          <p className="text-xs text-muted-foreground font-mono">
            {nft.mint.slice(0, 8)}...{nft.mint.slice(-4)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

interface NFTDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  nft: {
    mint: string;
    name: string;
    tier: 'Bronze' | 'Silver' | 'Gold' | null;
  } | null;
}

const NFTDetailModal: React.FC<NFTDetailModalProps> = ({ isOpen, onClose, nft }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  if (!nft) return null;

  const tierIcons = {
    Bronze: Award,
    Silver: Star,
    Gold: Crown,
  };

  const tierColors = {
    Bronze: 'from-amber-500 to-orange-500',
    Silver: 'from-gray-400 to-gray-600',
    Gold: 'from-yellow-400 to-yellow-600',
  };

  const TierIcon = nft.tier ? tierIcons[nft.tier] : Coffee;
  const gradientColor = nft.tier ? tierColors[nft.tier] : 'from-gray-400 to-gray-600';

  const handleCopyMint = async () => {
    try {
      await navigator.clipboard.writeText(nft.mint);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "NFT mint address copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleViewOnExplorer = () => {
    window.open(`https://explorer.solana.com/address/${nft.mint}?cluster=devnet`, '_blank');
  };

  const getBenefits = (tier: string) => {
    switch (tier) {
      case 'Bronze':
        return [
          '5% discount on all beverages',
          'Member-only newsletter',
          'Birthday surprise'
        ];
      case 'Silver':
        return [
          '10% discount on all beverages',
          'Priority ordering',
          'Member-only newsletter',
          'Birthday surprise',
          'Early access to new products'
        ];
      case 'Gold':
        return [
          '15% discount on all beverages',
          'Priority ordering',
          'Free pastry with coffee purchase',
          'VIP events access',
          'Personal barista consultation',
          'Member-only newsletter',
          'Birthday surprise'
        ];
      default:
        return ['Basic membership benefits'];
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className={`p-2 rounded-full bg-gradient-to-r ${gradientColor}`}>
              <TierIcon className="h-5 w-5 text-white" />
            </div>
            {nft.tier} Membership
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* NFT Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">NFT Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">Name</label>
                <p className="text-sm font-medium">{nft.name}</p>
              </div>
              
              <div>
                <label className="text-xs text-muted-foreground">Mint Address</label>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs font-mono flex-1 truncate">{nft.mint}</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCopyMint}
                    className="h-6 w-6 p-0"
                  >
                    {copied ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground">Tier</label>
                <Badge variant="secondary" className="ml-2">
                  {nft.tier}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          {nft.tier && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Member Benefits</CardTitle>
                <CardDescription className="text-xs">
                  Enjoy these exclusive perks with your {nft.tier} membership
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {getBenefits(nft.tier).map((benefit, index) => (
                    <li key={index} className="text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={handleViewOnExplorer}
              size="sm"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Explorer
            </Button>
            <Button 
              onClick={onClose} 
              className="flex-1"
              size="sm"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const NFTGallery: React.FC = () => {
  const { userNFTs, loading, refetch } = useUserNFTs();
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNFTClick = (nft: any) => {
    setSelectedNFT(nft);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNFT(null);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">My NFTs</h2>
          <p className="text-gray-600">Loading your SolBrew NFT collection...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">My NFT Collection</h2>
        <p className="text-gray-600 mb-4">
          {userNFTs.length === 0 
            ? "You don't have any SolBrew NFTs yet. Mint your first membership NFT to get started!"
            : `You own ${userNFTs.length} SolBrew membership NFT${userNFTs.length === 1 ? '' : 's'}`
          }
        </p>
        {userNFTs.length > 0 && (
          <Button onClick={refetch} variant="outline" size="sm">
            <Coffee className="h-4 w-4 mr-2" />
            Refresh Collection
          </Button>
        )}
      </div>

      {userNFTs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userNFTs.map((nft) => (
            <NFTCard
              key={nft.mint}
              nft={nft}
              onClick={() => handleNFTClick(nft)}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <Coffee className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No NFTs Found</h3>
            <p className="text-gray-500 mb-6">
              Start your SolBrew journey by minting your first membership NFT
            </p>
            <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Browse Membership Tiers
            </Button>
          </CardContent>
        </Card>
      )}

      <NFTDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        nft={selectedNFT}
      />
    </div>
  );
};
