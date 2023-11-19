import { darkTheme } from "@thirdweb-dev/react";
import ContractCard from "../components/contract-card";
import { BTN_ERC20_CONTRACT_ADDRESS, DOLLS_ERC721_CONTRACT_ADDRESS, MASK_STAKING_CONTRACT_ADDRESS } from "../constants/addresses";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            My{" "}
            <span className={styles.gradientText0}>
                Contracts
            </span>
          </h1>

          <p className={styles.description}>Select a contract to interact with.</p>
        </div>
        <div className={styles.grid}>
          <ContractCard
            href="/"
            contractAddress={BTN_ERC20_CONTRACT_ADDRESS}
            title="$BTN - ERC20"
            description="Claim ERC20 Tokens"
          />
          <ContractCard
            href="/"
            contractAddress={DOLLS_ERC721_CONTRACT_ADDRESS}
            title="Hounfour Dolls (ERC721)"
            description="Claim ERC721 Tokens"
          />
          <ContractCard
            href="/"
            contractAddress={MASK_STAKING_CONTRACT_ADDRESS}
            title="Hounfour Mask Staking"
            description="Stake ERC721 NFTs for ERC20 tokens."
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
