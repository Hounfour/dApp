import styles from '../styles/Home.module.css'
import { ThirdwebNftMedia, Web3Button, useContract, useNFT } from '@thirdweb-dev/react';
import { MASKS_ERC721_CONTRACT_ADDRESS, MASK_STAKING_CONTRACT_ADDRESS } from '../constants/addresses';

type NFTProps = {
    tokenId: number;
}

export default function StakedNFTCard({ tokenId }: NFTProps) {
    const {
        contract: ERC721Contract
    } = useContract(MASKS_ERC721_CONTRACT_ADDRESS, "nft-drop");
    const {
        contract: stakingContract
    } = useContract(MASK_STAKING_CONTRACT_ADDRESS);

    const {
        data: nftMetadata,
        isLoading: nftMetadataIsLoading,
    } = useNFT(ERC721Contract, tokenId);
    return (
        <div className={styles.card}>
            <ThirdwebNftMedia
                metadata={nftMetadata?.metadata!}
                width="100%"
                height="auto"
            />
            <div className={styles.nftInfoContainer}>
                <p className={styles.nftName}>{nftMetadata?.metadata.id}</p>
                <p className={styles.nftTokenId}>Token: #{nftMetadata?.metadata.id}</p>
            </div>
            <Web3Button
                contractAddress={MASK_STAKING_CONTRACT_ADDRESS}
                action={(contract) => contract.call(
                    "withdraw",
                    [[tokenId]]
                )}
                style={{
                    width: "100%",
                }}
            >Unstake</Web3Button>
        </div>
    )
}