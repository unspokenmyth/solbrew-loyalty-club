
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Coffee, 
  Crown, 
  Award, 
  Star, 
  TrendingUp, 
  Calendar,
  Gift,
  ExternalLink,
  User,
  Wallet
} from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { useUserNFTs } from "@/hooks/useUserNFTs";
import { NFTGallery } from "./NFTGallery";
import { QRCodeGenerator } from "./QRCodeGenerator";
import { NetworkStatus } from "./NetworkStatus";

interface MemberStatsProps {
  userTier: 'Bronze' | 'Silver' | 'Gold' | null;
  nftCount: number;
}

const MemberStats: React.FC<MemberStatsProps> = ({ userTier, nftCount }) => {
  // Mock data - replace with real data from your backend
  const mockStats = {
    totalSpent: 156.50,
    coffeesPurchased: 34,
    rewardsSaved: 23.45,
    memberSince: '2024-01-15',
    lastVisit: '2024-12-05',
    favoriteOrder: 'Cappuccino with oat milk',
    streak: 7, // days in a row visiting
  };

  const tierIcons = {
    Bronze: Award,
    Silver: Star,
    Gold: Crown,
  };

  const tierColors = {
    Bronze: 'text-amber-600 bg-amber-50 border-amber-200',
    Silver: 'text-gray-600 bg-gray-50 border-gray-200',
    Gold: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  };

  const TierIcon = userTier ? tierIcons[userTier] : Coffee;
  const tierClass = userTier ? tierColors[userTier] : 'text-gray-400 bg-gray-50 border-gray-200';

  const getNextTierProgress = () => {
    if (!userTier) return { nextTier: 'Bronze', progress: 0, needed: 1 };
    if (userTier === 'Bronze') return { nextTier: 'Silver', progress: 65, needed: 15 };
    if (userTier === 'Silver') return { nextTier: 'Gold', progress: 40, needed: 30 };
    return { nextTier: 'Maximum', progress: 100, needed: 0 };
  };

  const nextTierInfo = getNextTierProgress();

  return (
    <div className="space-y-6">
      {/* Member Status Card */}
      <Card className={`border-2 ${tierClass}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-white shadow-sm">
              <TierIcon className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span>{userTier || 'Guest'} Member</span>
                {nftCount > 1 && (
                  <Badge variant="secondary" className="text-xs">
                    {nftCount} NFTs
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground font-normal">
                Member since {new Date(mockStats.memberSince).toLocaleDateString()}
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userTier && nextTierInfo.nextTier !== 'Maximum' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to {nextTierInfo.nextTier}</span>
                <span>{nextTierInfo.progress}%</span>
              </div>
              <Progress value={nextTierInfo.progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {nextTierInfo.needed} more purchases to reach {nextTierInfo.nextTier} tier
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Coffee className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{mockStats.coffeesPurchased}</div>
              <p className="text-xs text-muted-foreground">Coffees Ordered</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">${mockStats.totalSpent}</div>
              <p className="text-xs text-muted-foreground">Total Spent</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Gift className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">${mockStats.rewardsSaved}</div>
              <p className="text-xs text-muted-foreground">Rewards Saved</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{mockStats.streak}</div>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personal Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Personal Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="text-muted-foreground">Favorite Order</label>
              <p className="font-medium">{mockStats.favoriteOrder}</p>
            </div>
            <div>
              <label className="text-muted-foreground">Last Visit</label>
              <p className="font-medium">
                {new Date(mockStats.lastVisit).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tier Benefits */}
      {userTier && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your {userTier} Benefits</CardTitle>
            <CardDescription>
              Enjoy these exclusive perks with your current membership tier
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {userTier === 'Bronze' && (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    5% discount on all beverages
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Member-only newsletter
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Birthday surprise
                  </div>
                </>
              )}
              {userTier === 'Silver' && (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    10% discount on all beverages
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Priority ordering
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Early access to new products
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    All Bronze benefits
                  </div>
                </>
              )}
              {userTier === 'Gold' && (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    15% discount on all beverages
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Free pastry with coffee purchase
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    VIP events access
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Personal barista consultation
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    All Silver & Bronze benefits
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export const MemberProfile: React.FC = () => {
  const { connected, walletAddress } = useWallet();
  const { userNFTs, userTier, loading } = useUserNFTs();

  if (!connected) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Member Profile
            </CardTitle>
            <CardDescription>
              Connect your wallet to view your SolBrew membership profile
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-8">
            <Wallet className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">
              Please connect your wallet to access your member profile
            </p>
            <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Connect Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="py-8">
            <div className="flex items-center justify-center">
              <Coffee className="h-8 w-8 animate-spin text-amber-600" />
              <span className="ml-2">Loading your profile...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Member Profile</h1>
          <p className="text-gray-600">
            Welcome back! Manage your SolBrew membership and rewards.
          </p>
        </div>
        <Button 
          variant="outline"
          onClick={() => window.open(`https://explorer.solana.com/address/${walletAddress}?cluster=devnet`, '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View Wallet
        </Button>
      </div>

      {/* Profile Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="nfts">My NFTs</TabsTrigger>
          <TabsTrigger value="qr">QR Code</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <MemberStats userTier={userTier} nftCount={userNFTs.length} />
        </TabsContent>

        <TabsContent value="nfts">
          <NFTGallery />
        </TabsContent>

        <TabsContent value="qr">
          <QRCodeGenerator />
        </TabsContent>

        <TabsContent value="network">
          <NetworkStatus />
        </TabsContent>
      </Tabs>
    </div>
  );
};
