import { ThirdwebNftMedia, Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import { MASKS_ERC721_CONTRACT_ADDRESS, MASK_STAKING_CONTRACT_ADDRESS } from "../constants/addresses"
import { NFT } from "@thirdweb-dev/sdk";
import styles from "../styles/collections.module.css";

type NFTProps = {
    nft: NFT;
};

export default function StakeMaskCard({ nft }: NFTProps) {
    const address = useAddress();

    const {
        contract: maskMintContract
    } = useContract(MASKS_ERC721_CONTRACT_ADDRESS, "nft-drop")
    const {
        contract: maskStakingContract
    } = useContract(MASK_STAKING_CONTRACT_ADDRESS);

    async function stakeNFT(nftId: number[]) {
        if (!address) return;

        const isApproved = await maskMintContract?.isApproved(
            address,
            MASK_STAKING_CONTRACT_ADDRESS,
        );

        if (!isApproved) {
            await maskMintContract?.setApprovalForAll(
                MASK_STAKING_CONTRACT_ADDRESS,
                true
            );
        };

        await maskStakingContract?.call("stake", [nftId]);
    };

    return (
        <div className={styles.card}>
            <ThirdwebNftMedia
                metadata={nft.metadata}
                width="100%"
                height="auto"
            />
            <div className={styles.nftInfoContainer}>
                <p className={styles.nftName}>{nft.metadata.name}</p>
                <p className={styles.nftTokenId}>Token ID#{nft.metadata.id}</p>
            </div>
            <Web3Button
                contractAddress={MASK_STAKING_CONTRACT_ADDRESS}
                action={() => stakeNFT([parseInt(nft.metadata.id)])}
                style={{ width: "100%" }}
            >Stake</Web3Button>
        </div>
    )
}