import ContractCard from "../components/contract-card";
import { BTN_ERC20_CONTRACT_ADDRESS, DOLLS_ERC721_CONTRACT_ADDRESS, MARKETPLACE_CONTRACT_ADDRESS, MASKS_ERC721_CONTRACT_ADDRESS, PROFILE_STATUS_CONTRACT_ADDRESS } from "../constants/addresses";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <main>
      <div className={styles.container}>
        <div>
          <h1 className={styles.title}>
            Vodou{" "}
            <span className={styles.gradientText0}>
                dApp
            </span>
          </h1>
          <p className={styles.description}>Select a contract to interact with.</p>
        </div>
        <div className={styles.grid}>
          <ContractCard
            href="/"
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
        </div>
      </div>
    </main>
  );
};

export default Home;
