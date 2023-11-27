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
  const address = useAddress();

  const { contract: butnContract } = useContract(
    BUTN_ERC20_CONTRACT_ADDRESS,
    "token-drop"
  );

  const {
    data: butnContractMetadata,
    isLoading: butnContractMetadataIsLoading,
  } = useContractMetadata(butnContract);

  const { data: butnTokenMaxSupply, isLoading: butnTokenMaxSupplyIsLoading } =
    useTokenSupply(butnContract);

  const { data: butnTokenSupply, isLoading: butnTokenSupplyIsLoading } =
    useTokenSupply(butnContract);

  const { data: butnTokenBalance, isLoading: butnTokenBalanceIsLoading } =
    useTokenBalance(butnContract, address);

  const { contract: btnContract } = useContract(
    BTN_ERC20_CONTRACT_ADDRESS,
    "token"
  );

  const { data: btnTokenSupply, isLoading: btnTokenSupplyIsLoading } =
    useTokenSupply(btnContract);

  const { data: btnTokenBalance, isLoading: btnTokenBalanceIsLoading } =
    useTokenBalance(btnContract, address);

  return (
    <div className={styles.container}>
      <HeroCard
        isLoading={butnContractMetadataIsLoading}
        title={butnContractMetadata?.name!}
        description={butnContractMetadata?.description!}
        image={butnContractMetadata?.image!}
      />
      <div className={styles.grid}>
        <div className={styles.componentCard}>
          <h3 className={styles.gradientText0}>Token Stats</h3>
          {btnTokenSupplyIsLoading || butnTokenSupplyIsLoading ? (
            <p className={styles.gradientText3}>Loading supply...</p>
          ) : (
            <>
              <p className={styles.gradientText1}>
                Total BTN supply: {btnTokenSupply?.displayValue}{" "}
                {btnTokenSupply?.symbol}
              </p>
              <p className={styles.gradientText1}>
                Total BUTN supply: {butnTokenSupply?.displayValue}{" "}
                {butnTokenSupply?.symbol}
              </p>
            </>
          )}
        </div>

        <div className={styles.grid}>
          <div className={styles.componentCard}>
            <h3 className={styles.gradientText0}>Token Balance</h3>
            {btnTokenBalanceIsLoading || butnTokenBalanceIsLoading ? (
              <p className={styles.gradientText3}>Loading balance...</p>
            ) : (
              <>
                <p className={styles.gradientText1}>
                  Balance (BTN): {btnTokenBalance?.displayValue}{" "}
                  {btnTokenBalance?.symbol}
                </p>
                <Web3Button
                  contractAddress={BTN_ERC20_CONTRACT_ADDRESS}
                  action={(contract) => contract.erc20.burn(10)}
                  theme={customDarkTheme}
                >
                  Burn 10 BTN
                </Web3Button>
                <p className={styles.gradientText1}>
                  Balance (BUTN): {butnTokenBalance?.displayValue}{" "}
                  {butnTokenBalance?.symbol}
                </p>
                <Web3Button
                  contractAddress={BUTN_ERC20_CONTRACT_ADDRESS}
                  action={(contract) => contract.erc20.burn(10)}
                  theme={customDarkTheme}
                >
                  Burn 10 BUTN
                </Web3Button>
              </>
            )}
          </div>
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
            contractAddress={BTN_ERC20_CONTRACT_ADDRESS}
            action={async (contract) => {
              try {
                const claimData = {
                  proof: ["0"], // Adjust the proof array as needed
                  quantityLimitPerWallet: "0", // Adjust quantity limit per wallet if required
                  pricePerToken: "0", // Adjust the price per token if needed
                  currency: "0x0Cbd5F68f505342F8fA79157c0CC447619991375", // Adjust the currency if needed
                  // Adjust other properties based on the contract's requirements
                };

                const receipt = await contract.erc20.claim(
                  address!,
                  claimData // Pass the claim data object directly
                );
                // Handle the receipt or any other actions after claiming here
              } catch (error) {
                // Handle specific error messages or codes related to the claim process
              }
            }}
            theme={customDarkTheme}
          >
            Claim Tokens
          </Web3Button>
          <p className={styles.gradientText1}>Mint $BUTNS</p>
          <Link href="/project/erc721">
            <button className={styles.matchButton}>Claim ERC721</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
