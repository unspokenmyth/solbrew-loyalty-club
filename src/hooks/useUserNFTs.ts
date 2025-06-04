
import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { publicKey } from '@metaplex-foundation/umi';
import { mplTokenMetadata, fetchDigitalAssetsByOwner } from '@metaplex-foundation/mpl-token-metadata';
import { connection } from '@/config/solana';

interface UserNFT {
  mint: string;
  name: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | null;
}

export const useUserNFTs = () => {
  const { publicKey: walletPublicKey } = useWallet();
  const [userNFTs, setUserNFTs] = useState<UserNFT[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUserNFTs = async () => {
    if (!walletPublicKey) {
      setUserNFTs([]);
      return;
    }

    setLoading(true);

    try {
      const umi = createUmi(connection.rpcEndpoint).use(mplTokenMetadata());
      
      // Fetch all NFTs owned by the wallet
      const digitalAssets = await fetchDigitalAssetsByOwner(
        umi,
        publicKey(walletPublicKey.toString())
      );

      // Filter for SolBrew NFTs based on name pattern
      const solbrewNFTs: UserNFT[] = digitalAssets
        .filter(asset => 
          asset.metadata.name.includes('SolBrew') && 
          asset.metadata.name.includes('Membership')
        )
        .map(asset => {
          let tier: 'Bronze' | 'Silver' | 'Gold' | null = null;
          if (asset.metadata.name.includes('Bronze')) tier = 'Bronze';
          else if (asset.metadata.name.includes('Silver')) tier = 'Silver';
          else if (asset.metadata.name.includes('Gold')) tier = 'Gold';

          return {
            mint: asset.publicKey.toString(),
            name: asset.metadata.name,
            tier,
          };
        });

      setUserNFTs(solbrewNFTs);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      setUserNFTs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserNFTs();
  }, [walletPublicKey]);

  const getUserTier = (): 'Bronze' | 'Silver' | 'Gold' | null => {
    // Return highest tier owned (Gold > Silver > Bronze)
    if (userNFTs.some(nft => nft.tier === 'Gold')) return 'Gold';
    if (userNFTs.some(nft => nft.tier === 'Silver')) return 'Silver';
    if (userNFTs.some(nft => nft.tier === 'Bronze')) return 'Bronze';
    return null;
  };

  return {
    userNFTs,
    loading,
    refetch: fetchUserNFTs,
    userTier: getUserTier(),
  };
};
