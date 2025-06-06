
import { Connection, clusterApiUrl } from '@solana/web3.js';

// Solana connection
export const connection = new Connection(
  process.env.NODE_ENV === 'production' 
    ? clusterApiUrl('mainnet-beta')
    : clusterApiUrl('devnet'),
  'confirmed'
);

// NFT Collection Configuration
export const NFT_COLLECTION_CONFIG = {
  Bronze: {
    name: 'SolBrew Bronze Membership',
    symbol: 'SOLBREW-B',
    description: 'Bronze tier membership NFT for SolBrew loyalty program with 5% discounts and priority queue access.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&crop=center',
    price: 0, // Changed to 0 SOL for testing
  },
  Silver: {
    name: 'SolBrew Silver Membership',
    symbol: 'SOLBREW-S', 
    description: 'Silver tier membership NFT for SolBrew loyalty program with 10% discounts, free upgrades, and exclusive lounge access.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop&crop=center',
    price: 0, // Changed to 0 SOL for testing
  },
  Gold: {
    name: 'SolBrew Gold Membership',
    symbol: 'SOLBREW-G',
    description: 'Gold tier membership NFT for SolBrew loyalty program with 15% discounts, VIP perks, and private barista sessions.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop&crop=center',
    price: 0, // Changed to 0 SOL for testing
  },
} as const;

export type TierType = keyof typeof NFT_COLLECTION_CONFIG;
