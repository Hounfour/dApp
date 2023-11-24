import ContractCard from "../components/contract-card";
import { BTN_ERC20_CONTRACT_ADDRESS, DOLLS_ERC721_CONTRACT_ADDRESS, MARKETPLACE_CONTRACT_ADDRESS, MASKS_ERC721_CONTRACT_ADDRESS, PROFILE_STATUS_CONTRACT_ADDRESS } from "../constants/addresses";
import styles from "../styles/dashboard.module.css";
import { NextPage } from "next";

const Home: NextPage = () => {
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
            Hounfours Web3 Portal</p>
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
            href="/project/erc721"
            contractAddress={DOLLS_ERC721_CONTRACT_ADDRESS}
            title="Hounfour Dolls"
            description="Mint & stake your Hounfour Dolls"
          />
          <ContractCard
            href="/project/staking"
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

// fuq

export default Home;
