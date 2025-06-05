
import { NFT_COLLECTION_CONFIG } from '@/config/solana';

export interface NFTMetadata {
  name: string;
  symbol: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
  properties: {
    category: string;
    files: Array<{
      uri: string;
      type: string;
    }>;
  };
  external_url?: string;
  animation_url?: string;
}

export class MetadataService {
  private static readonly IPFS_GATEWAY = 'https://gateway.pinata.cloud/ipfs/';
  private static readonly ARWEAVE_GATEWAY = 'https://arweave.net/';

  // Placeholder images for development - replace with actual hosted images
  private static readonly PLACEHOLDER_IMAGES = {
    Bronze: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=400&fit=crop',
    Silver: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=400&fit=crop',
    Gold: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop',
  };

  static generateNFTMetadata(tier: 'Bronze' | 'Silver' | 'Gold'): NFTMetadata {
    const config = NFT_COLLECTION_CONFIG[tier];
    const placeholderImage = this.PLACEHOLDER_IMAGES[tier];

    return {
      name: config.name,
      symbol: config.symbol,
      description: config.description,
      image: placeholderImage, // Use config.image when you have actual hosted images
      attributes: [
        {
          trait_type: 'Tier',
          value: tier,
        },
        {
          trait_type: 'Program',
          value: 'SolBrew Loyalty',
        },
        {
          trait_type: 'Utility',
          value: 'Coffee Membership',
        },
        {
          trait_type: 'Discount',
          value: tier === 'Bronze' ? '5%' : tier === 'Silver' ? '10%' : '15%',
        },
        {
          trait_type: 'Priority Access',
          value: tier === 'Bronze' ? 'No' : 'Yes',
        },
        {
          trait_type: 'VIP Perks',
          value: tier === 'Gold' ? 'Yes' : 'No',
        },
      ],
      properties: {
        category: 'image',
        files: [
          {
            uri: placeholderImage,
            type: 'image/png',
          },
        ],
      },
      external_url: 'https://solbrew.coffee',
    };
  }

  static async uploadToIPFS(metadata: NFTMetadata): Promise<string> {
    // This is a placeholder implementation
    // In production, integrate with Pinata, NFT.Storage, or similar service
    console.log('Uploading metadata to IPFS:', metadata);
    
    // Mock IPFS hash for development
    const mockHash = `Qm${Math.random().toString(36).substring(2, 48)}`;
    return `${this.IPFS_GATEWAY}${mockHash}`;
  }

  static async uploadToArweave(metadata: NFTMetadata): Promise<string> {
    // This is a placeholder implementation
    // In production, integrate with Arweave using arweave-js
    console.log('Uploading metadata to Arweave:', metadata);
    
    // Mock Arweave transaction ID for development
    const mockTxId = Math.random().toString(36).substring(2, 45);
    return `${this.ARWEAVE_GATEWAY}${mockTxId}`;
  }

  static validateMetadata(metadata: NFTMetadata): boolean {
    return !!(
      metadata.name &&
      metadata.symbol &&
      metadata.description &&
      metadata.image &&
      metadata.attributes &&
      metadata.properties
    );
  }

  static async uploadImage(file: File, storage: 'ipfs' | 'arweave' = 'ipfs'): Promise<string> {
    // Placeholder for image upload functionality
    console.log(`Uploading image to ${storage}:`, file.name);
    
    if (storage === 'ipfs') {
      const mockHash = `Qm${Math.random().toString(36).substring(2, 48)}`;
      return `${this.IPFS_GATEWAY}${mockHash}`;
    } else {
      const mockTxId = Math.random().toString(36).substring(2, 45);
      return `${this.ARWEAVE_GATEWAY}${mockTxId}`;
    }
  }

  static getMetadataFromNFT(nftData: any): NFTMetadata | null {
    try {
      // Parse metadata from on-chain NFT data
      if (nftData.metadata && nftData.metadata.uri) {
        // In a real implementation, fetch the metadata from the URI
        return this.generateNFTMetadata('Bronze'); // Placeholder
      }
      return null;
    } catch (error) {
      console.error('Error parsing NFT metadata:', error);
      return null;
    }
  }
}

// Utility functions for metadata management
export const createMetadataJson = (tier: 'Bronze' | 'Silver' | 'Gold') => {
  const metadata = MetadataService.generateNFTMetadata(tier);
  return JSON.stringify(metadata, null, 2);
};

export const downloadMetadata = (tier: 'Bronze' | 'Silver' | 'Gold') => {
  const metadata = createMetadataJson(tier);
  const blob = new Blob([metadata], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `solbrew-${tier.toLowerCase()}-metadata.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
