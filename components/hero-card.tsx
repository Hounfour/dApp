import styles from "../styles/heroCard.module.css";
import { MediaRenderer } from "@thirdweb-dev/react";

type HeroCardProps = {
  isLoading: boolean;
  title: string;
  description: string;
  image: string;
};

export default function HeroCard(props: HeroCardProps) {
  return (
    <div className={styles.heroContainer}>
      {props.isLoading ? (
        <div className={styles.loadingText}>
          <p>Loading...</p>
        </div>
      ) : (
        <div className={styles.grid}>
          <MediaRenderer src={props.image} className={styles.heroCardImage} />
          <div className={styles.heroCardContent}>
            <h1 className={styles.gradientText}>{props.title}</h1>
            <p>{props.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
