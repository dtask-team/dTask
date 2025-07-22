import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, arbitrum],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'dTask',
  projectId: 'YOUR_PROJECT_ID', // Replace with WalletConnect project ID
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export const RainbowProvider = ({ children }) => (
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains} theme={darkTheme()}>
      {children}
    </RainbowKitProvider>
  </WagmiConfig>
);
