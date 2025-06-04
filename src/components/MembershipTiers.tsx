
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Star, Award, Zap, Coffee, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MembershipTiersProps {
  isWalletConnected: boolean;
  userTier: string | null;
  onMint: (tier: string) => void;
}

interface TierData {
  name: string;
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

export const MembershipTiers = ({ isWalletConnected, userTier, onMint }: MembershipTiersProps) => {
  const { toast } = useToast();
  const [mintingTier, setMintingTier] = useState<string | null>(null);

  const handleMint = async (tierName: string) => {
    if (!isWalletConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to mint an NFT membership.",
        variant: "destructive",
      });
      return;
    }

    setMintingTier(tierName);
    
    // Simulate minting process
    setTimeout(() => {
      onMint(tierName);
      setMintingTier(null);
      toast({
        title: "NFT Minted Successfully! 🎉",
        description: `Your ${tierName} membership NFT has been minted to your wallet.`,
      });
    }, 3000);
  };

  return (
    <div id="membership-tiers" className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {tiers.map((tier) => {
        const Icon = tier.icon;
        const isOwned = userTier === tier.name;
        const isMinting = mintingTier === tier.name;
        
        return (
          <Card 
            key={tier.name}
            className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
              isOwned ? 'ring-2 ring-green-500 shadow-lg' : ''
            } ${tier.borderColor} border-2`}
          >
            {isOwned && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-500 text-white">Owned</Badge>
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
              
              <div className="text-3xl font-bold text-gray-800 mt-2">
                {tier.price}
              </div>
              
              <CardDescription className="text-lg font-semibold text-gray-600">
                {tier.monthlyPerks}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Gift className="h-4 w-4 mr-2 text-green-600" />
                  Benefits
                </h4>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Zap className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Crown className="h-4 w-4 mr-2 text-purple-600" />
                  Exclusive Access
                </h4>
                <ul className="space-y-2">
                  {tier.exclusive.map((perk, index) => (
                    <li key={index} className="flex items-start">
                      <Star className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={() => handleMint(tier.name)}
                disabled={!isWalletConnected || isOwned || isMinting}
                className={`w-full ${
                  isOwned 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : `bg-gradient-to-r ${tier.gradient} hover:opacity-90`
                } text-white font-semibold py-3 rounded-lg transition-all duration-300`}
              >
                {isOwned ? (
                  <>
                    <Award className="h-4 w-4 mr-2" />
                    Owned
                  </>
                ) : isMinting ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Minting...
                  </>
                ) : (
                  <>
                    <Crown className="h-4 w-4 mr-2" />
                    Mint NFT
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
