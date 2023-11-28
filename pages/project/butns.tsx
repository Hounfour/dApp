import HeroCard from "../../components/hero-card";
import styles from "../../styles/collections.module.css";
import {
  Web3Button,
  darkTheme,
  useContract,
  useContractMetadata,
} from "@thirdweb-dev/react";
import { BUTN_ERC20_CONTRACT_ADDRESS } from "../../constants/addresses";
import Link from "next/link";
import BTNToken from "../../components/btn-token";
import BUTNToken from "../../components/butn-token";

const customDarkTheme = darkTheme({
  fontFamily: "serif",
  colors: {
    primaryText: "#cb6a1a",
    secondaryText: "#a9a8a7",
    accentText: "#1a681e",
    accentButtonBg: "#1a681e",
    accentButtonText: "#320647",
    primaryButtonBg: "#320647",
    primaryButtonText: "#cb6a1a",
    secondaryButtonBg: "#1a681e",
    secondaryButtonText: "#bebdc7",
    secondaryButtonHoverBg: "#cb6a1a",
    modalBg: "#320647",
    dropdownBg: "#320647",
    walletSelectorButtonHoverBg: "#1a681e",
    separatorLine: "#552d0c",
    secondaryIconColor: "#bebdc7",
    secondaryIconHoverBg: "",
    secondaryIconHoverColor: "#ff0000",
    connectedButtonBg: "#552d0c",
    connectedButtonBgHover: "#1a681e",
  },
});

export default function ButnProject() {
  const { contract: butnContract } = useContract(
    BUTN_ERC20_CONTRACT_ADDRESS,
    "token-drop"
  );
  const {
    data: butnContractMetadata,
    isLoading: butnContractMetadataIsLoading,
  } = useContractMetadata(butnContract);

  return (
    <div className={styles.container}>
      <HeroCard
        isLoading={butnContractMetadataIsLoading}
        title={butnContractMetadata?.name!}
        description={butnContractMetadata?.description!}
        image={butnContractMetadata?.image!}
      />
      <div className={styles.butnGrid}>
        <BTNToken />
        <BUTNToken />
      </div>

      <div className={styles.componentCard}>
        <h3 className={styles.gradientText0}>Earn Tokens</h3>
        <p className={styles.gradientText1}>Earn $BTN by staking NFTs</p>
        <div className={styles.linkContainer}>
          <Link href="/project/masks">
            <button className={styles.connectButtonBg}>Stake Mask</button>
          </Link>
          <Link href="/project/dolls">
            <button className={styles.connectButtonBg}>Stake Doll</button>
          </Link>
        </div>
        <p className={styles.gradientText1}>Mint $BUTNS</p>
        <Web3Button
          contractAddress={BUTN_ERC20_CONTRACT_ADDRESS}
          action={(contract) => contract.erc20.claim(1000)}
          theme={customDarkTheme}
        >
          1 MATIC /1K BUTNS
        </Web3Button>
      </div>
    </div>
  );
}
