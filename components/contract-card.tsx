import Link from "next/link";
import styles from "../styles/contractCard.module.css";
import {
  MediaRenderer,
  useContract,
  useContractMetadata,
} from "@thirdweb-dev/react";

type CardProps = {
  href: string;
  contractAddress: string;
  title: string;
  description: string;
};

export default function ContractCard(props: CardProps) {
  const { contract } = useContract(props.contractAddress);

  const { data: contractMetadata } = useContractMetadata(contract);

  return (
    <Link href={props.href} className={styles.card}>
      <MediaRenderer src={contractMetadata?.image} className={styles.cardImg} />
      <div className={styles.cardText}>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
    </Link>
  );
}
