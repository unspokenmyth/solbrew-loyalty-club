
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wifi, WifiOff, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";
import { connection } from "@/config/solana";
import { currentEnvironment, config, getEnvironmentInfo } from "@/config/environment";

interface NetworkStats {
  rpcHealth: 'healthy' | 'degraded' | 'offline';
  blockHeight: number | null;
  tps: number | null;
  lastChecked: Date;
}

export const NetworkStatus: React.FC = () => {
  const [stats, setStats] = useState<NetworkStats>({
    rpcHealth: 'offline',
    blockHeight: null,
    tps: null,
    lastChecked: new Date(),
  });
  const [isChecking, setIsChecking] = useState(false);
  const envInfo = getEnvironmentInfo();

  const checkNetworkHealth = async () => {
    setIsChecking(true);
    try {
      const startTime = Date.now();
      
      // Test RPC health
      const blockHeight = await connection.getBlockHeight();
      const latency = Date.now() - startTime;
      
      // Get recent performance samples
      const perfSamples = await connection.getRecentPerformanceSamples(1);
      const tps = perfSamples[0]?.numTransactions || 0;
      
      setStats({
        rpcHealth: latency < 2000 ? 'healthy' : 'degraded',
        blockHeight,
        tps,
        lastChecked: new Date(),
      });
    } catch (error) {
      console.error('Network health check failed:', error);
      setStats(prev => ({
        ...prev,
        rpcHealth: 'offline',
        lastChecked: new Date(),
      }));
    }
    setIsChecking(false);
  };

  useEffect(() => {
    checkNetworkHealth();
    const interval = setInterval(checkNetworkHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    switch (stats.rpcHealth) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'offline':
        return <WifiOff className="h-4 w-4 text-red-500" />;
      default:
        return <Wifi className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (stats.rpcHealth) {
      case 'healthy':
        return 'default';
      case 'degraded':
        return 'secondary';
      case 'offline':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-2">
            {getStatusIcon()}
            Network Status
          </span>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={checkNetworkHealth}
            disabled={isChecking}
          >
            <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
        <CardDescription>
          Solana network and RPC endpoint status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Environment Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <label className="text-xs text-muted-foreground">Environment</label>
            <Badge variant="outline" className="ml-2">
              {currentEnvironment}
            </Badge>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Network</label>
            <Badge variant="outline" className="ml-2">
              {config.network}
            </Badge>
          </div>
        </div>

        {/* Network Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">RPC Health</span>
            <Badge variant={getStatusColor()}>
              {stats.rpcHealth}
            </Badge>
          </div>
          
          {stats.blockHeight && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Block Height</span>
              <span className="text-sm font-mono">
                {stats.blockHeight.toLocaleString()}
              </span>
            </div>
          )}
          
          {stats.tps !== null && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">TPS</span>
              <span className="text-sm font-mono">
                {stats.tps.toLocaleString()}
              </span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Last Check</span>
            <span className="text-xs text-muted-foreground">
              {stats.lastChecked.toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* RPC Endpoint */}
        <div className="text-xs">
          <label className="text-muted-foreground">RPC Endpoint</label>
          <p className="font-mono text-xs break-all mt-1 p-2 bg-muted rounded">
            {config.rpcEndpoint}
          </p>
        </div>

        {/* Environment Features */}
        {envInfo.features && (
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">Features</label>
            <div className="flex flex-wrap gap-1">
              {Object.entries(envInfo.features).map(([feature, enabled]) => (
                <Badge 
                  key={feature} 
                  variant={enabled ? "default" : "secondary"}
                  className="text-xs"
                >
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Warnings */}
        {envInfo.environment === 'development' && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">Development Mode</span>
            </div>
            <p className="text-xs text-yellow-700 mt-1">
              Using devnet. NFTs minted here are for testing only.
            </p>
          </div>
        )}

        {stats.rpcHealth === 'offline' && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-800">
              <WifiOff className="h-4 w-4" />
              <span className="text-sm font-medium">Connection Issues</span>
            </div>
            <p className="text-xs text-red-700 mt-1">
              Unable to connect to Solana RPC. Some features may not work.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
