import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Coffee, Gift, Star, Crown, Calendar, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RewardsDisplayProps {
  userTier: string;
}

export const RewardsDisplay = ({ userTier }: RewardsDisplayProps) => {
  const { toast } = useToast();

  const tierColors = {
    Bronze: "from-amber-400 to-orange-500",
    Silver: "from-gray-400 to-gray-600", 
    Gold: "from-yellow-400 to-yellow-600"
  };

  const tierIcons = {
    Bronze: Coffee,
    Silver: Star,
    Gold: Crown
  };

  const rewardData = {
    Bronze: {
      monthlyCredits: 1,
      usedCredits: 0,
      loyaltyPoints: 150,
      nextReward: 350,
      availableRewards: [
        { name: "Free Regular Coffee", points: 100, available: true, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=150&fit=crop" },
        { name: "Birthday Drink", points: 0, available: true, image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=200&h=150&fit=crop" },
        { name: "Size Upgrade", points: 50, available: true, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=150&fit=crop" }
      ]
    },
    Silver: {
      monthlyCredits: 2,
      usedCredits: 1,
      loyaltyPoints: 420,
      nextReward: 580,
      availableRewards: [
        { name: "Free Premium Coffee", points: 150, available: true, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=150&fit=crop" },
        { name: "Free Pastry", points: 200, available: true, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=150&fit=crop" },
        { name: "Tasting Event Access", points: 0, available: true, image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=200&h=150&fit=crop" },
        { name: "Custom Drink Creation", points: 300, available: true, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&h=150&fit=crop" }
      ]
    },
    Gold: {
      monthlyCredits: 5,
      usedCredits: 2,
      loyaltyPoints: 890,
      nextReward: 1000,
      availableRewards: [
        { name: "Any Drink Free", points: 0, available: true, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=150&fit=crop" },
        { name: "Premium Bean Bag", points: 500, available: true, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=150&fit=crop" },
        { name: "Private Barista Session", points: 0, available: true, image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=200&h=150&fit=crop" },
        { name: "Quarterly Gift Box", points: 0, available: true, image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=150&fit=crop" },
        { name: "VIP Event Access", points: 0, available: true, image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=200&h=150&fit=crop" }
      ]
    }
  };

  const data = rewardData[userTier as keyof typeof rewardData];
  const TierIcon = tierIcons[userTier as keyof typeof tierIcons];
  const progressPercent = (data.loyaltyPoints / data.nextReward) * 100;

  const handleRedeem = (rewardName: string, points: number) => {
    if (points > data.loyaltyPoints) {
      toast({
        title: "Insufficient Points",
        description: `You need ${points - data.loyaltyPoints} more points to redeem this reward.`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Reward Redeemed! 🎉",
      description: `${rewardName} has been redeemed successfully.`,
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${tierColors[userTier as keyof typeof tierColors]} flex items-center justify-center shadow-lg mr-4`}>
            <TierIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {userTier} Member Dashboard
            </h2>
            <p className="text-gray-600">Manage your rewards and track your progress</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Monthly Credits */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Coffee className="h-5 w-5 mr-2 text-amber-600" />
              Monthly Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {data.monthlyCredits - data.usedCredits} / {data.monthlyCredits}
            </div>
            <p className="text-sm text-gray-600">Credits remaining this month</p>
            <Progress 
              value={((data.monthlyCredits - data.usedCredits) / data.monthlyCredits) * 100} 
              className="mt-3"
            />
          </CardContent>
        </Card>

        {/* Loyalty Points */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Star className="h-5 w-5 mr-2 text-yellow-600" />
              Loyalty Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {data.loyaltyPoints.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">
              {data.nextReward - data.loyaltyPoints} points to next reward
            </p>
            <Progress value={progressPercent} className="mt-3" />
          </CardContent>
        </Card>

        {/* Next Renewal */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Membership Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-green-600 mb-2">
              Active
            </div>
            <p className="text-sm text-gray-600">
              NFT valid until membership transfer or burn
            </p>
            <Badge className="mt-3 bg-green-100 text-green-800 border-green-200">
              Blockchain Verified
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Available Rewards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Gift className="h-6 w-6 mr-2 text-purple-600" />
            Available Rewards
          </CardTitle>
          <CardDescription>
            Redeem your loyalty points for these exclusive rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.availableRewards.map((reward, index) => (
              <div 
                key={index}
                className="bg-gradient-to-r from-white to-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <img 
                  src={reward.image} 
                  alt={reward.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-800 text-sm">{reward.name}</h4>
                    {reward.points === 0 && (
                      <Badge className="bg-green-100 text-green-800 text-xs">Free</Badge>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    {reward.points > 0 ? (
                      <span className="text-lg font-bold text-amber-600">
                        {reward.points} pts
                      </span>
                    ) : (
                      <span className="text-lg font-bold text-green-600">
                        Included
                      </span>
                    )}
                  </div>

                  <Button
                    onClick={() => handleRedeem(reward.name, reward.points)}
                    disabled={reward.points > data.loyaltyPoints && reward.points > 0}
                    className={`w-full ${
                      reward.points === 0 || reward.points <= data.loyaltyPoints
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    size="sm"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Redeem
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};