
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      buffer: "buffer",
      stream: "stream-browserify",
      url: "url",
      http: "stream-http",
      https: "https-browserify",
    },
  },
  define: {
    global: 'globalThis',
    'process.env': {},
  },
  optimizeDeps: {
    include: [
      '@solana/web3.js',
      '@metaplex-foundation/umi-bundle-defaults',
      '@metaplex-foundation/mpl-token-metadata',
      'buffer',
      'stream-browserify',
      'url',
      'stream-http',
      'https-browserify',
    ],
  },
}));
