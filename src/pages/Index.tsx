
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Coffee, Star, Crown, Award, Zap, Gift } from "lucide-react";
import { WalletConnection } from "@/components/WalletConnection";
import { MembershipTiers } from "@/components/MembershipTiers";
import { RewardsDisplay } from "@/components/RewardsDisplay";
import { HeroSection } from "@/components/HeroSection";
import { useWallet } from "@/hooks/useWallet";
import { useUserNFTs } from "@/hooks/useUserNFTs";

const Index = () => {
  const { connected } = useWallet();
  const { userTier } = useUserNFTs();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Coffee className="h-8 w-8 text-amber-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              SolBrew
            </span>
          </div>
          <WalletConnection />
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Membership Tiers */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Choose Your Membership Tier
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mint your SolBrew NFT membership and unlock exclusive perks. Each tier is an NFT on the Solana blockchain.
            </p>
          </div>
          <MembershipTiers />
        </div>
      </section>

      {/* Rewards Section */}
      {userTier && (
        <section className="py-20 px-4 bg-gradient-to-r from-amber-100 to-orange-100">
          <div className="container mx-auto">
            <RewardsDisplay userTier={userTier} />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Coffee className="h-6 w-6 text-amber-400" />
            <span className="text-xl font-bold">SolBrew Loyalty</span>
          </div>
          <p className="text-gray-400 mb-4">
            Decentralized loyalty program powered by Solana blockchain
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <span>Built on Solana</span>
            <span>•</span>
            <span>NFT Memberships</span>
            <span>•</span>
            <span>Real Coffee Rewards</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
