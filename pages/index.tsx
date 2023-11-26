import React, { useMemo } from 'react';
import { NextPage } from "next";
import ContractCard from "../components/contract-card";
import {
  BTN_ERC20_CONTRACT_ADDRESS,
  DOLLS_ERC721_CONTRACT_ADDRESS,
  MARKETPLACE_CONTRACT_ADDRESS,
  MASKS_ERC721_CONTRACT_ADDRESS,
  PROFILE_STATUS_CONTRACT_ADDRESS
} from "../constants/addresses";
import styles from "../styles/dashboard.module.css";

const contractCardsData = [
  {
    href: '/project/profileStatus',
    contractAddress: PROFILE_STATUS_CONTRACT_ADDRESS,
    title: 'Profile Status',
    description: 'Set your profile status',
  },
  {
    href: '/project/dolls',
    contractAddress: DOLLS_ERC721_CONTRACT_ADDRESS,
    title: 'Hounfour Dolls',
    description: 'Mint & stake your Hounfour Dolls',
  },
  {
    href: '/project/masks',
    contractAddress: MASKS_ERC721_CONTRACT_ADDRESS,
    title: 'Hounfour Masks',
    description: 'Mint & stake your Hounfour Masks',
  },
  {
    href: '/',
    contractAddress: MARKETPLACE_CONTRACT_ADDRESS,
    title: 'Mystic Market Shop',
    description: 'View marketplace inventory',
  },
  {
    href: '/',
    contractAddress: BTN_ERC20_CONTRACT_ADDRESS,
    title: '$BUTNS',
    description: "Hounfour's primary currency",
  },
];

const Home: NextPage = () => {
  const renderContractCards = useMemo(() => {
    return contractCardsData.map((cardData, index) => (
      <ContractCard
        key={index}
        href={cardData.href}
        contractAddress={cardData.contractAddress}
        title={cardData.title}
        description={cardData.description}
      />
    ));
  }, [contractCardsData]);

  return (
    <main className={styles.container}>
      <header>
        <h1 className={styles.title}>
          Vodou{' '}
          <span className={styles.gradientText}>
            dApp
          </span>
          <p className={styles.description} style={{ paddingLeft: '5rem' }}>
            Hounfours Web3 Portal
          </p>
        </h1>
      </header>
      <section className={styles.grid}>
        {renderContractCards}
      </section>
    </main>
  );
};

export default Home;
