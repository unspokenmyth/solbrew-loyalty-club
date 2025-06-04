
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

// Solana network configuration
export const SOLANA_NETWORK = 'devnet'; // Change to 'mainnet-beta' for production
export const RPC_ENDPOINT = clusterApiUrl(SOLANA_NETWORK);

// Connection to Solana network
export const connection = new Connection(RPC_ENDPOINT, 'confirmed');

// Mock program ID (replace with actual deployed program ID)
export const LOYALTY_PROGRAM_ID = new PublicKey('11111111111111111111111111111111');

// NFT Collection configuration
export const NFT_COLLECTION_CONFIG = {
  Bronze: {
    name: 'SolBrew Bronze Membership',
    symbol: 'SOLBREW_BRONZE',
    description: 'Bronze tier membership NFT for SolBrew Loyalty Program',
    image: 'https://your-storage.com/bronze-nft.png',
    price: 0.1, // SOL
  },
  Silver: {
    name: 'SolBrew Silver Membership',
    symbol: 'SOLBREW_SILVER', 
    description: 'Silver tier membership NFT for SolBrew Loyalty Program',
    image: 'https://your-storage.com/silver-nft.png',
    price: 0.25, // SOL
  },
  Gold: {
    name: 'SolBrew Gold Membership',
    symbol: 'SOLBREW_GOLD',
    description: 'Gold tier membership NFT for SolBrew Loyalty Program', 
    image: 'https://your-storage.com/gold-nft.png',
    price: 0.5, // SOL
  },
};
