
import { Button } from "@/components/ui/button";
import { Coffee, Zap, Crown } from "lucide-react";

export const HeroSection = () => {
  const scrollToTiers = () => {
    const tiersSection = document.querySelector('#membership-tiers');
    tiersSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-orange-500/5 to-yellow-400/10"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-amber-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-300/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-amber-200">
            <Zap className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-700">Powered by Solana Blockchain</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Brew Your Way to
            <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Exclusive Rewards
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Join the first decentralized coffee loyalty program. Mint NFT memberships, 
            earn rewards, and enjoy exclusive perks at SolBrew Coffee. Your loyalty, 
            now on the blockchain.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={scrollToTiers}
          >
            <Crown className="h-5 w-5 mr-2" />
            Mint Your Membership
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
          >
            <Coffee className="h-5 w-5 mr-2" />
            Learn More
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">NFT Memberships</h3>
            <p className="text-gray-600">Unique tiered memberships as NFTs on Solana blockchain</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Coffee className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Real Rewards</h3>
            <p className="text-gray-600">Redeem your NFT perks for actual coffee and treats</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Instant Verification</h3>
            <p className="text-gray-600">Fast, secure verification through blockchain technology</p>
          </div>
        </div>
      </div>
    </section>
  );
};
