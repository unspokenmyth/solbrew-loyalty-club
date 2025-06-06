import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Coffee, Zap, Star, Crown } from "lucide-react";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { useWallet } from "@/hooks/useWallet";

export const HeroSection = () => {
  const { connected } = useWallet();

  const scrollToMembership = () => {
    const element = document.getElementById('membership-tiers');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background with geometric shapes */}
      <div className="absolute inset-0">
        <HeroGeometric 
          badge="SolBrew Loyalty"
          title1="Elevate Your Coffee"
          title2="Experience"
        />
      </div>
      
      {/* Content Overlay - positioned properly with better spacing */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center pt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Main content that appears after the title with proper spacing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.5 }}
              className="mt-32 mb-16"
            >
              <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-light max-w-3xl mx-auto drop-shadow-2xl">
                Join the future of coffee loyalty with blockchain-powered NFT memberships. 
                Unlock exclusive perks, earn rewards, and be part of the SolBrew community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
                <Button
                  onClick={scrollToMembership}
                  size="lg"
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold px-10 py-4 text-lg shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105"
                >
                  <Coffee className="h-5 w-5 mr-2" />
                  Get Your NFT Membership
                </Button>
                
                {connected && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-white/10 backdrop-blur-sm px-10 py-4 text-lg shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <Star className="h-5 w-5 mr-2" />
                    View My Rewards
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Feature highlights - appear last with better spacing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Zap className="h-10 w-10 text-amber-300 mb-6 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-3">Instant Rewards</h3>
                <p className="text-white/80 text-sm leading-relaxed">Get immediate access to discounts and perks</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Crown className="h-10 w-10 text-amber-300 mb-6 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-3">VIP Access</h3>
                <p className="text-white/80 text-sm leading-relaxed">Exclusive events and premium experiences</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Star className="h-10 w-10 text-amber-300 mb-6 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-3">Blockchain Verified</h3>
                <p className="text-white/80 text-sm leading-relaxed">Secure, tradeable NFT memberships</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};