import styles from "../styles/Home.module.css";
import { MediaRenderer, useContract, useContractMetadata } from "@thirdweb-dev/react";

type HeroCardProps = {
    isLoading: boolean;
    title: string;
    description: string;
    image: string;
}

export default function HeroCard(props: HeroCardProps) {
    return (
        <>
            {props.isLoading ? (
                <div className={styles.loadingText}>
                    <p>Loading...</p>
                </div>
            ) : (
                    <div className={styles.heroCardImage}>
                        <MediaRenderer
                            src={props.image}
                            width="150px"
                            height="auto"
                            className={styles.heroCardContractImage}
                        />
                    <div className={styles.heroCardContent}>
                        <h1 className={styles.gradientText1}>{props.title}</h1>
                        <p>{props.description}</p>
                    </div>
                </div>
            )}
        </>
    )
}