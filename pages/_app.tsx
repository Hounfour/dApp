import type { AppProps } from "next/app";
import { ThirdwebProvider, coinbaseWallet, embeddedWallet, localWallet, metamaskWallet, phantomWallet, smartWallet, trustWallet, walletConnect } from "@thirdweb-dev/react";
import "../styles/globals.css";
import NavBar from "../components/navbar";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "polygon";

// Configuration for the smart wallet
const smartWalletConfig = {
  factoryAddress: "0xdb5eC6BAF021f2ca75be08c0cC6890DeAB1a9922",
  gasless: true, // Indicates whether the wallet supports gasless transactions
};

function MyApp({ Component, pageProps }: AppProps) {
  try {
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
          smartWallet(walletConnect(), smartWalletConfig),
          smartWallet(localWallet(), smartWalletConfig)
        ]}
      >
        <NavBar />
        <Component {...pageProps} />
      </ThirdwebProvider>
    );
  } catch (error) {
    // Handle the error gracefully
    console.error("An error occurred:", error);
    // Optionally, display a message to the user or perform fallback actions
    return <div>An error occurred. Please try again later.</div>;
  }
};

export default MyApp;
