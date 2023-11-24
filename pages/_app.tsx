import type { AppProps } from "next/app";
import { LocalWallet, SmartWallet, ThirdwebProvider, coinbaseWallet, darkTheme, embeddedWallet, localWallet, metamaskWallet, phantomWallet, smartWallet, trustWallet } from "@thirdweb-dev/react";
import "../styles/globals.css";
import NavBar from "../components/navbar";
import { SMART_WALLET_CONTRACT_ADDRESS } from "../constants/addresses";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "polygon";

const customDarkTheme = darkTheme({
  fontFamily: "serif",
  colors: {
    primaryText: "#cb6a1a",
    secondaryText: "#a9a8a7",
    accentText: "#1a681e",
    //danger: "",
    // success: "",
    // modalOverlayBg: "",
    accentButtonBg: "#1a681e",
    accentButtonText: "#320647",
    primaryButtonBg: "#320647",
    primaryButtonText: "#cb6a1a",
    secondaryButtonBg: "#1a681e",
    secondaryButtonText: "#bebdc7",
    secondaryButtonHoverBg: "#cb6a1a",
    modalBg: "#320647",
    dropdownBg: "#320647",
    // tooltipBg: "",
    // tooltipText: "",
    // inputAutofillBg: "",
    scrollbarBg: "#131313",
    walletSelectorButtonHoverBg: "#1a681e",
    separatorLine: "#552d0c",
    secondaryIconColor: "#bebdc7",
    secondaryIconHoverBg: "",
    secondaryIconHoverColor: "#ff0000",
    // borderColor: "",
    // skeletonBg: "",
    // selectedTextColor: "",
    // selectedTextBg: "",
    connectedButtonBg: "#552d0c",
    connectedButtonBgHover: "#1a681e"
  }
});

const personalWallet = new LocalWallet();
await personalWallet.generate();

const smartWalletConfig = {
  chain: "polygon",
  factoryAddress: SMART_WALLET_CONTRACT_ADDRESS,
  clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID,
  gasless: true,
};

const wallet = new SmartWallet(smartWalletConfig);
await wallet.connect({
  personalWallet,
});

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
