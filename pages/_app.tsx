import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  coinbaseWallet,
  embeddedWallet,
  localWallet,
  metamaskWallet,
  phantomWallet,
  smartWallet,
  trustWallet
} from "@thirdweb-dev/react";
import "../styles/globals.css";
import NavBar from "../components/navbar";
import { SMART_WALLET_CONTRACT_ADDRESS } from "../constants/addresses";

const activeChain = "polygon";

const smartWalletConfig = {
  factoryAddress: SMART_WALLET_CONTRACT_ADDRESS,
  gasless: true
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
      supportedWallets={[
        smartWallet(embeddedWallet(), smartWalletConfig),
        smartWallet(metamaskWallet(), smartWalletConfig),
        smartWallet(coinbaseWallet(), smartWalletConfig),
        smartWallet(trustWallet(), smartWalletConfig),
        smartWallet(phantomWallet(), smartWalletConfig),
        smartWallet(localWallet(), smartWalletConfig)
      ]}
    >
      <NavBar />
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
