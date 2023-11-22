import { ConnectWallet, Web3Button, embeddedWallet, metamaskWallet, smartWallet, useAddress, useConnect, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import ContractCard from "../components/contract-card";
import { BTN_ERC20_CONTRACT_ADDRESS, DOLLS_ERC721_CONTRACT_ADDRESS, MARKETPLACE_CONTRACT_ADDRESS, MASKS_ERC721_CONTRACT_ADDRESS, PROFILE_STATUS_CONTRACT_ADDRESS, SMART_WALLET_CONTRACT_ADDRESS } from "../constants/addresses";
import styles from "../styles/dashboard.module.css";
import { NextPage } from "next";
import { useState } from "react";

const embeddedWalletConfig = embeddedWallet();
const smartEmbeddedWalletConfig = smartWallet(embeddedWalletConfig, {
  factoryAddress: SMART_WALLET_CONTRACT_ADDRESS,
  gasless: true,
});

const metaMaskWalletConfig = metamaskWallet();
const smartMetaMaskWalletConfig = smartWallet(metaMaskWalletConfig, {
  factoryAddress: SMART_WALLET_CONTRACT_ADDRESS,
  gasless: true,
});

const Home: NextPage = () => {
  const address = useAddress();
  const connect = useConnect();

  const [emailInput, setEmailInput] = useState("");
  const [personalEmbeddedWalletAddress, setPersonalEmbeddedWalletAddress] = useState<string | undefined>(undefined)
  const [personalMetaMaskWalletAddress, setPersonalMetaMaskWalletAddress] = useState<string | undefined>(undefined)

  const [smartEmbeddedWalletAddress, setSmartEmbeddedWalletAddress] = useState<string | undefined>(undefined)
  const [smartMetaMaskWalletAddress, setSmartMetaMaskWalletAddress] = useState<string | undefined>(undefined)

  const handleLogin = async () => {
    try {
      const personalEmbeddedWallet = await connect(embeddedWalletConfig);
      const personalMetaMaskWallet = await connect(metaMaskWalletConfig);

      
      const personalMetaMaskWalletAddress = await personalMetaMaskWallet.getAddress();

      setPersonalEmbeddedWalletAddress(personalEmbeddedWalletAddress);
      setPersonalMetaMaskWalletAddress(personalMetaMaskWalletAddress);

      const smartEmbeddedWallet = await connect(smartEmbeddedWalletConfig, {
        personalWallet: personalEmbeddedWallet,
        chainId: 137,
      });
      const smartEmbeddedWalletAddress = await smartEmbeddedWallet.getAddress();
      setSmartEmbeddedWalletAddress(smartEmbeddedWalletAddress);

      const smartMetaMaskWallet = await connect(smartMetaMaskWalletConfig, {
        personalWallet: personalMetaMaskWallet,
        chainId: 137,
      });
      const smartMetaMaskWalletAddress = await smartMetaMaskWallet.getAddress();
      setSmartMetaMaskWalletAddress(smartMetaMaskWalletAddress);

      setEmailInput("");
    } catch (error) {
      console.error(error);
    }
  };

  const { contract } = useContract(MASKS_ERC721_CONTRACT_ADDRESS);

  const {
    data: personalOwnedNFTs,
    isLoading: isOwnedNFTsLoading,
  } = useOwnedNFTs(contract, personalEmbeddedWalletAddress);

  const {
    data: smartOwnedNFTs,
    isLoading: isSmartOwnedNFTsLoading,
  } = useOwnedNFTs(contract, smartEmbeddedWalletAddress);

  const {
    data: personalMetaMaskOwnedNFTs,
    isLoading: isMetaMaskOwnedNFTsLoading,
  } = useOwnedNFTs(contract, personalMetaMaskWalletAddress);

  const {
    data: smartMetaMaskOwnedNFTs,
    isLoading: isSmartMetaMaskOwnedNFTsLoading,
  } = useOwnedNFTs(contract, smartMetaMaskWalletAddress);
  
  return (
      <main className={styles.container}>
      <header>
          <h1 className={styles.title}>
            Vodou{" "}
            <span className={styles.gradientText}>
                dApp
            </span>
          <p className={styles.description} style={{
            paddingLeft: '5rem',
          }}>
            Hounfour's Web3 Portal</p>
        </h1>
        </header>
        <section className={styles.grid}>
          <ContractCard
            href="/project/profileStatus"
            contractAddress={PROFILE_STATUS_CONTRACT_ADDRESS}
            title="Profile Status"
            description="Set your profile status"
          />
          <ContractCard
            href="/"
            contractAddress={DOLLS_ERC721_CONTRACT_ADDRESS}
            title="Hounfour Dolls"
            description="Mint & stake your Hounfour Dolls"
          />
          <ContractCard
            href="/"
            contractAddress={MASKS_ERC721_CONTRACT_ADDRESS}
            title="Hounfour Masks"
            description="Mint & stake your Hounfour Masks"
          />
          <ContractCard
            href="/"
            contractAddress={MARKETPLACE_CONTRACT_ADDRESS}
            title="Mystic Market Shop"
            description="View marketplace inventory"
          />
          <ContractCard
            href="/"
            contractAddress={BTN_ERC20_CONTRACT_ADDRESS}
            title="$BUTNS"
            description="Hounfour's primary currency"
          />
        </section>
    </main>
  );
};

export default Home;
