
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coffee, Crown, Award, Star, Zap, Gift, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";
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
          
          <div className="flex items-center gap-4">
            {connected && (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Link to="/admin">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Admin
                  </Button>
                </Link>
              </>
            )}
            <WalletConnection />
          </div>
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

      {/* Quick Access for Members */}
      {connected && (
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Member Dashboard
              </h2>
              <p className="text-gray-600">
                Quick access to your membership features
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link to="/profile">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <User className="h-12 w-12 text-amber-600 mx-auto mb-2" />
                    <CardTitle className="text-lg">My Profile</CardTitle>
                    <CardDescription>
                      View your membership status, NFTs, and rewards
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/admin">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <Settings className="h-12 w-12 text-amber-600 mx-auto mb-2" />
                    <CardTitle className="text-lg">Admin Panel</CardTitle>
                    <CardDescription>
                      Manage rewards and verify member benefits
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Gift className="h-12 w-12 text-amber-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Rewards Center</CardTitle>
                  <CardDescription>
                    Track your savings and available benefits
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  {userTier ? (
                    <Badge variant="default" className="mt-2">
                      {userTier} Member
                    </Badge>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Mint an NFT to access rewards
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
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
