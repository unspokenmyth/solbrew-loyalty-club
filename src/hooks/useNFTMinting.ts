
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { mplTokenMetadata, createNft, fetchDigitalAsset } from '@metaplex-foundation/mpl-token-metadata';
import { generateSigner, percentAmount, publicKey } from '@metaplex-foundation/umi';
import { connection, NFT_COLLECTION_CONFIG } from '@/config/solana';
import { useToast } from '@/hooks/use-toast';

export const useNFTMinting = () => {
  const { wallet, publicKey: walletPublicKey, sendTransaction } = useWallet();
  const { toast } = useToast();
  const [minting, setMinting] = useState<string | null>(null);

  const mintNFT = async (tier: 'Bronze' | 'Silver' | 'Gold') => {
    if (!wallet || !walletPublicKey) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to mint an NFT",
        variant: "destructive",
      });
      return;
    }

    setMinting(tier);

    try {
      // Create UMI instance
      const umi = createUmi(connection.rpcEndpoint)
        .use(mplTokenMetadata())
        .use(walletAdapterIdentity(wallet.adapter));

      // Get tier config
      const tierConfig = NFT_COLLECTION_CONFIG[tier];
      
      // Generate NFT mint keypair
      const mint = generateSigner(umi);

      // Create NFT metadata
      const metadata = {
        name: tierConfig.name,
        symbol: tierConfig.symbol,
        description: tierConfig.description,
        image: tierConfig.image,
        attributes: [
          { trait_type: 'Tier', value: tier },
          { trait_type: 'Program', value: 'SolBrew Loyalty' },
          { trait_type: 'Utility', value: 'Coffee Membership' },
        ],
        properties: {
          category: 'image',
          files: [{ uri: tierConfig.image, type: 'image/png' }],
        },
      };

      // Check wallet balance
      const balance = await connection.getBalance(walletPublicKey);
      const requiredLamports = tierConfig.price * LAMPORTS_PER_SOL;
      
      if (balance < requiredLamports) {
        throw new Error(`Insufficient balance. Required: ${tierConfig.price} SOL`);
      }

      // Create NFT transaction
      const createNftTx = await createNft(umi, {
        mint,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: '', // In production, upload metadata to IPFS/Arweave
        sellerFeeBasisPoints: percentAmount(5), // 5% royalty
        creators: [
          {
            address: umi.identity.publicKey,
            verified: true,
            share: 100,
          },
        ],
      });

      // Send transaction
      const signature = await createNftTx.sendAndConfirm(umi);
      
      console.log('NFT minted successfully:', signature);
      
      toast({
        title: "NFT Minted Successfully! 🎉",
        description: `Your ${tier} membership NFT has been minted to your wallet.`,
      });

      return {
        mint: mint.publicKey,
        signature: signature.signature,
        tier,
      };

    } catch (error) {
      console.error('Minting error:', error);
      toast({
        title: "Minting Failed",
        description: error instanceof Error ? error.message : "Failed to mint NFT",
        variant: "destructive",
      });
    } finally {
      setMinting(null);
    }
  };

  return {
    mintNFT,
    minting,
  };
};
