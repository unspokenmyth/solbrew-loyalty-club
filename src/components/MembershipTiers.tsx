import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Star, Award, Zap, Coffee, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/hooks/useWallet";
import { useUserNFTs } from "@/hooks/useUserNFTs";
import { MintingModal } from "./MintingModal";
import { useState } from "react";

interface TierData {
  name: 'Bronze' | 'Silver' | 'Gold';
  price: string;
  color: string;
  icon: any;
  gradient: string;
  borderColor: string;
  benefits: string[];
  monthlyPerks: string;
  exclusive: string[];
}

const tiers: TierData[] = [
  {
    name: "Bronze",
    price: "0.1 SOL",
    color: "text-amber-700",
    icon: Coffee,
    gradient: "from-amber-400 to-orange-500",
    borderColor: "border-amber-300",
    benefits: ["5% discount on all drinks", "Priority queue", "Birthday free drink"],
    monthlyPerks: "1 free coffee per month",
    exclusive: ["Bronze member events", "Early access to new drinks"]
  },
  {
    name: "Silver",
    price: "0.25 SOL",
    color: "text-gray-700",
    icon: Star,
    gradient: "from-gray-400 to-gray-600",
    borderColor: "border-gray-300",
    benefits: ["10% discount on all drinks", "Free size upgrades", "2x loyalty points", "Bronze perks included"],
    monthlyPerks: "2 free coffees per month",
    exclusive: ["Silver lounge access", "Monthly tasting events", "Custom drink creation"]
  },
  {
    name: "Gold",
    price: "0.5 SOL",
    color: "text-yellow-700",
    icon: Crown,
    gradient: "from-yellow-400 to-yellow-600",
    borderColor: "border-yellow-300",
    benefits: ["15% discount on all drinks", "Free premium add-ons", "3x loyalty points", "All previous perks"],
    monthlyPerks: "5 free coffees per month",
    exclusive: ["VIP gold lounge", "Private barista sessions", "First access to limited beans", "Quarterly gift box"]
  }
];

export const MembershipTiers = () => {
  const { toast } = useToast();
  const { connected } = useWallet();
  const { userNFTs, userTier } = useUserNFTs();
  const [selectedTier, setSelectedTier] = useState<'Bronze' | 'Silver' | 'Gold' | null>(null);
  const [showMintingModal, setShowMintingModal] = useState(false);

  const handleMint = async (tierName: 'Bronze' | 'Silver' | 'Gold') => {
    if (!connected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to mint an NFT membership.",
        variant: "destructive",
      });
      return;
    }

    setSelectedTier(tierName);
    setShowMintingModal(true);
  };

  const isOwned = (tierName: string) => {
    return userNFTs.some(nft => nft.tier === tierName);
  };

  return (
    <div className="bg-gradient-to-b from-amber-50/50 via-orange-50/30 to-yellow-50/50 py-20">
      <div id="membership-tiers" className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          const owned = isOwned(tier.name);
          
          return (
            <Card 
              key={tier.name}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                owned ? 'ring-2 ring-green-500 shadow-lg' : ''
              } ${tier.borderColor} border-2 bg-white/80 backdrop-blur-sm`}
            >
              {owned && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white shadow-lg">Owned</Badge>
                </div>
              )}
              
              <div className={`h-2 bg-gradient-to-r ${tier.gradient}`}></div>
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${tier.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <CardTitle className={`text-2xl font-bold ${tier.color}`}>
                  {tier.name} Membership
                </CardTitle>
                
                <div className="text-4xl font-black text-gray-800 mt-2 tracking-tight">
                  {tier.price}
                </div>
                
                <CardDescription className="text-lg font-bold text-gray-700 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  {tier.monthlyPerks}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center text-base">
                    <Gift className="h-4 w-4 mr-2 text-green-600" />
                    Benefits
                  </h4>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Zap className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-semibold text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center text-base">
                    <Crown className="h-4 w-4 mr-2 text-purple-600" />
                    Exclusive Access
                  </h4>
                  <ul className="space-y-2">
                    {tier.exclusive.map((perk, index) => (
                      <li key={index} className="flex items-start">
                        <Star className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-semibold text-gray-700">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex justify-center">
                  <Button
                    onClick={() => handleMint(tier.name)}
                    disabled={!connected || owned}
                    className={`w-full ${
                      owned 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : `bg-gradient-to-r ${tier.gradient} hover:opacity-90`
                    } text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    {owned ? (
                      <>
                        <Award className="h-4 w-4 mr-2" />
                        Owned
                      </>
                    ) : (
                      <>
                        <Crown className="h-4 w-4 mr-2" />
                        Mint NFT
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedTier && (
        <MintingModal
          isOpen={showMintingModal}
          onClose={() => {
            setShowMintingModal(false);
            setSelectedTier(null);
          }}
          tier={selectedTier}
        />
      )}
    </div>
  );
};