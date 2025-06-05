
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';

export type Environment = 'development' | 'staging' | 'production';

export interface EnvironmentConfig {
  network: WalletAdapterNetwork;
  rpcEndpoint: string;
  explorerUrl: string;
  metadataStorage: 'mock' | 'ipfs' | 'arweave';
  features: {
    debugMode: boolean;
    mockData: boolean;
    analytics: boolean;
    errorReporting: boolean;
  };
}

const environments: Record<Environment, EnvironmentConfig> = {
  development: {
    network: WalletAdapterNetwork.Devnet,
    rpcEndpoint: clusterApiUrl(WalletAdapterNetwork.Devnet),
    explorerUrl: 'https://explorer.solana.com',
    metadataStorage: 'mock',
    features: {
      debugMode: true,
      mockData: true,
      analytics: false,
      errorReporting: false,
    },
  },
  staging: {
    network: WalletAdapterNetwork.Devnet,
    rpcEndpoint: clusterApiUrl(WalletAdapterNetwork.Devnet),
    explorerUrl: 'https://explorer.solana.com',
    metadataStorage: 'ipfs',
    features: {
      debugMode: true,
      mockData: false,
      analytics: true,
      errorReporting: true,
    },
  },
  production: {
    network: WalletAdapterNetwork.Mainnet,
    rpcEndpoint: clusterApiUrl(WalletAdapterNetwork.Mainnet),
    explorerUrl: 'https://explorer.solana.com',
    metadataStorage: 'arweave',
    features: {
      debugMode: false,
      mockData: false,
      analytics: true,
      errorReporting: true,
    },
  },
};

// Auto-detect environment based on hostname
const getEnvironment = (): Environment => {
  if (typeof window === 'undefined') return 'development';
  
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'development';
  } else if (hostname.includes('staging') || hostname.includes('lovable.app')) {
    return 'staging';
  } else {
    return 'production';
  }
};

export const currentEnvironment = getEnvironment();
export const config = environments[currentEnvironment];

// Environment utilities
export const isDevelopment = () => currentEnvironment === 'development';
export const isProduction = () => currentEnvironment === 'production';
export const isStaging = () => currentEnvironment === 'staging';

// Feature flags
export const isFeatureEnabled = (feature: keyof EnvironmentConfig['features']) => {
  return config.features[feature];
};

// Debug logging
export const debugLog = (...args: any[]) => {
  if (isFeatureEnabled('debugMode')) {
    console.log('[SolBrew Debug]', ...args);
  }
};

// Network helpers
export const getExplorerUrl = (address: string, type: 'address' | 'tx' = 'address') => {
  const cluster = config.network === WalletAdapterNetwork.Mainnet ? '' : `?cluster=${config.network}`;
  return `${config.explorerUrl}/${type}/${address}${cluster}`;
};

// Environment status component props
export const getEnvironmentInfo = () => ({
  environment: currentEnvironment,
  network: config.network,
  rpcEndpoint: config.rpcEndpoint,
  features: config.features,
  isMainnet: config.network === WalletAdapterNetwork.Mainnet,
});
