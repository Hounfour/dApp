import HeroCard from "../../components/hero-card";
import styles from "../../styles/Home.module.css";
import {
  Web3Button,
  darkTheme,
  useAddress,
  useContract,
  useContractMetadata,
  useTokenBalance,
  useTokenSupply,
} from "@thirdweb-dev/react";
import {
  BTN_ERC20_CONTRACT_ADDRESS,
  BUTN_ERC20_CONTRACT_ADDRESS,
} from "../../constants/addresses";
import Link from "next/link";

export default function ButnProject() {
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

  const address = useAddress();

  const { contract: btnContract } = useContract(
    BTN_ERC20_CONTRACT_ADDRESS,
    "token"
  );

  const { data: btnContractMetadata, isLoading: btnContractMetadataIsLoading } =
    useContractMetadata(btnContract);

  const { data: btnTokenSupply, isLoading: btnTokenSupplyIsLoading } =
    useTokenSupply(btnContract);

  const { data: btnTokenBalance, isLoading: btnTokenBalanceIsLoading } =
    useTokenBalance(btnContract, address);

  const { contract: butnContract } = useContract(
    BUTN_ERC20_CONTRACT_ADDRESS,
    "token-drop"
  );

  const {
    data: butnContractMetadata,
    isLoading: butnContractMetadataIsLoading,
  } = useContractMetadata(butnContract);

  const { data: butnTokenSupply, isLoading: butnTokenSupplyIsLoading } =
    useTokenSupply(butnContract);

  const { data: butnTokenBalance, isLoading: butnTokenBalanceIsLoading } =
    useTokenBalance(butnContract, address);

  const { data: butnTokenMaxSupply, isLoading: butnTokenMaxSupplyIsLoading } =
    useTokenSupply(butnContract);

  return (
    <div className={styles.container}>
      <HeroCard
        isLoading={btnContractMetadataIsLoading}
        title={btnContractMetadata?.name!}
        description={btnContractMetadata?.description!}
        image={btnContractMetadata?.image!}
      />
      <div className={styles.grid}>
        <div className={styles.componentCard}>
          <h3 className={styles.gradientText0}>Token Stats</h3>
          {btnTokenSupplyIsLoading ? (
            <p className={styles.gradientText3}>Loading supply...</p>
          ) : (
            <p className={styles.gradientText1}>
              Total BTN supply: {btnTokenSupply?.displayValue}{" "}
              {btnTokenSupply?.symbol}
            </p>
          )}
        </div>
        <div className={styles.componentCard}>
          <h3 className={styles.gradientText0}>Token Balance</h3>
          {btnTokenBalanceIsLoading ? (
            <p className={styles.gradientText3}>Loading balance...</p>
          ) : (
            <p className={styles.gradientText1}>
              Balance: {btnTokenBalance?.displayValue} {btnTokenBalance?.symbol}
            </p>
          )}
          <Web3Button
            contractAddress={BTN_ERC20_CONTRACT_ADDRESS}
            action={(contract) => contract.erc20.burn(10)}
            theme={customDarkTheme}
          >
            Burn 10 Butns
          </Web3Button>
        </div>
        <div className={styles.componentCard}>
          <h3 className={styles.gradientText0}>Earn Tokens</h3>
          <p className={styles.gradientText1}>
            Earn more butns by staking an ERC721 NFT.
          </p>
          <div>
            <Link href="/project/staking">
              <button className={styles.connectButtonBg}>Stake ERC721</button>
            </Link>
            <Link href="/project/erc721">
              <button className={styles.matchButton}>Claim ERC721</button>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.componentCard}>
          <h3 className={styles.gradientText0}>Token Stats</h3>
          {butnTokenSupplyIsLoading ? (
            <p className={styles.gradientText3}>Loading supply...</p>
          ) : (
            <p className={styles.gradientText1}>
              Total BUTN supply: {butnTokenSupply?.displayValue}{" "}
              {butnTokenSupply?.symbol}
            </p>
          )}
        </div>
        <div className={styles.componentCard}>
          <h3 className={styles.gradientText0}>Token Balance</h3>
          {butnTokenBalanceIsLoading ? (
            <p className={styles.gradientText3}>Loading balance...</p>
          ) : (
            <p className={styles.gradientText1}>
              Balance: {butnTokenBalance?.displayValue}{" "}
              {butnTokenBalance?.symbol}
            </p>
          )}
          <Web3Button
            contractAddress={BUTN_ERC20_CONTRACT_ADDRESS}
            action={(contract) => contract.erc20.burn(10)}
            theme={customDarkTheme}
          >
            Burn 10 Butns
          </Web3Button>
        </div>
        <div className={styles.componentCard}>
          <h3 className={styles.gradientText0}>Earn Tokens</h3>
          <p className={styles.gradientText1}>
            Earn more butns by staking an ERC721 NFT.
          </p>
          <div>
            <Link href="/project/staking">
              <button className={styles.connectButtonBg}>Stake ERC721</button>
            </Link>
            <Link href="/project/erc721">
              <button className={styles.matchButton}>Claim ERC721</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
