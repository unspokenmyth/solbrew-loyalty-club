
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Coffee, 
  Users, 
  QrCode, 
  TrendingUp, 
  Gift, 
  Crown, 
  Award, 
  Star,
  Search,
  CheckCircle,
  Clock
} from "lucide-react";

interface MemberStats {
  totalMembers: number;
  bronzeMembers: number;
  silverMembers: number;
  goldMembers: number;
  totalRedemptions: number;
  todayRedemptions: number;
}

interface RedemptionRecord {
  id: string;
  walletAddress: string;
  tier: 'Bronze' | 'Silver' | 'Gold';
  rewardType: string;
  timestamp: Date;
  status: 'pending' | 'completed';
}

export const AdminDashboard: React.FC = () => {
  const [searchWallet, setSearchWallet] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);

  // Mock data - replace with real data from your backend
  const stats: MemberStats = {
    totalMembers: 1247,
    bronzeMembers: 856,
    silverMembers: 298,
    goldMembers: 93,
    totalRedemptions: 3421,
    todayRedemptions: 23,
  };

  const recentRedemptions: RedemptionRecord[] = [
    {
      id: '1',
      walletAddress: '7xKXt...Y9zM',
      tier: 'Gold',
      rewardType: 'Free Coffee',
      timestamp: new Date(),
      status: 'completed'
    },
    {
      id: '2',
      walletAddress: 'Bm4nX...K8vL',
      tier: 'Silver',
      rewardType: '10% Discount',
      timestamp: new Date(Date.now() - 300000),
      status: 'pending'
    },
  ];

  const handleVerifyWallet = async () => {
    if (!searchWallet) return;
    
    // Mock verification - replace with actual NFT verification logic
    setVerificationResult({
      isValid: true,
      tier: 'Gold',
      nftCount: 1,
      walletAddress: searchWallet,
    });
  };

  const tierIcons = {
    Bronze: Award,
    Silver: Star,
    Gold: Crown,
  };

  const tierColors = {
    Bronze: 'text-amber-600',
    Silver: 'text-gray-500',
    Gold: 'text-yellow-500',
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">SolBrew Admin</h1>
            <p className="text-gray-600">Manage your loyalty program and member rewards</p>
          </div>
          <div className="flex items-center gap-2">
            <Coffee className="h-8 w-8 text-amber-600" />
            <span className="text-xl font-bold text-amber-600">SolBrew</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMembers}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Redemptions</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayRedemptions}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalRedemptions} total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gold Members</CardTitle>
              <Crown className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.goldMembers}</div>
              <p className="text-xs text-muted-foreground">
                VIP tier members
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue Impact</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+24%</div>
              <p className="text-xs text-muted-foreground">
                vs. last quarter
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="verify" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="verify">Verify Members</TabsTrigger>
            <TabsTrigger value="redemptions">Redemptions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="verify">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Member Verification
                </CardTitle>
                <CardDescription>
                  Verify customer NFT membership for in-store rewards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter wallet address or scan QR code..."
                    value={searchWallet}
                    onChange={(e) => setSearchWallet(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleVerifyWallet}>
                    <Search className="h-4 w-4 mr-2" />
                    Verify
                  </Button>
                </div>

                {verificationResult && (
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="font-semibold">Valid Member</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Wallet: {verificationResult.walletAddress}
                          </p>
                        </div>
                        <Badge className={`${tierColors[verificationResult.tier]} bg-white`}>
                          {verificationResult.tier} Tier
                        </Badge>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <h4 className="font-medium">Available Rewards:</h4>
                        <div className="space-y-1 text-sm">
                          {verificationResult.tier === 'Bronze' && (
                            <div>• 5% discount on all beverages</div>
                          )}
                          {verificationResult.tier === 'Silver' && (
                            <>
                              <div>• 10% discount on all beverages</div>
                              <div>• Priority ordering</div>
                            </>
                          )}
                          {verificationResult.tier === 'Gold' && (
                            <>
                              <div>• 15% discount on all beverages</div>
                              <div>• Priority ordering</div>
                              <div>• Free pastry with coffee</div>
                              <div>• VIP events access</div>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="redemptions">
            <Card>
              <CardHeader>
                <CardTitle>Recent Redemptions</CardTitle>
                <CardDescription>
                  Track customer reward redemptions and manage pending requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRedemptions.map((redemption) => {
                    const TierIcon = tierIcons[redemption.tier];
                    return (
                      <div key={redemption.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <TierIcon className={`h-5 w-5 ${tierColors[redemption.tier]}`} />
                          <div>
                            <p className="font-medium">{redemption.rewardType}</p>
                            <p className="text-sm text-gray-600">{redemption.walletAddress}</p>
                            <p className="text-xs text-gray-500">
                              {redemption.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={redemption.status === 'completed' ? 'default' : 'secondary'}
                            className="flex items-center gap-1"
                          >
                            {redemption.status === 'completed' ? (
                              <CheckCircle className="h-3 w-3" />
                            ) : (
                              <Clock className="h-3 w-3" />
                            )}
                            {redemption.status}
                          </Badge>
                          {redemption.status === 'pending' && (
                            <Button size="sm" variant="outline">
                              Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Membership Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-amber-600" />
                        <span>Bronze</span>
                      </div>
                      <span className="font-medium">{stats.bronzeMembers}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-gray-500" />
                        <span>Silver</span>
                      </div>
                      <span className="font-medium">{stats.silverMembers}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Crown className="h-4 w-4 text-yellow-500" />
                        <span>Gold</span>
                      </div>
                      <span className="font-medium">{stats.goldMembers}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <QrCode className="h-4 w-4 mr-2" />
                    Generate QR Scanner
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Gift className="h-4 w-4 mr-2" />
                    Create Custom Reward
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Export Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
