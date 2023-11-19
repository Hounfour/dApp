import { ThirdwebNftMedia, Web3Button, useAddress, useContract, useNFT } from "@thirdweb-dev/react";
import { MASKS_ERC721_CONTRACT_ADDRESS, MASK_STAKING_CONTRACT_ADDRESS } from "../constants/addresses"
import { NFT } from "@thirdweb-dev/sdk";
import styles from "../styles/Home.module.css";

type NFTProps = {
    nft: NFT;
};

export default function StakeNFTCard({ nft }: NFTProps) {
    const address = useAddress();

    const {
        contract: ERC721Contract
    } = useContract(MASKS_ERC721_CONTRACT_ADDRESS, "nft-drop")
    const {
        contract: stakingContract
    } = useContract(MASK_STAKING_CONTRACT_ADDRESS);

    async function stakeNFT(nftId: number[]) {
        if (!address) return;
        
        const isApproved = await ERC721Contract?.isApproved(
            address,
            MASK_STAKING_CONTRACT_ADDRESS,
        );

        if (!isApproved) {
            await ERC721Contract?.setApprovalForAll(
                MASK_STAKING_CONTRACT_ADDRESS,
                true
            );
        };

        await stakingContract?.call("stake", [nftId]);
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
                style={{width: "100%"}}
            >Stake</Web3Button>
        </div>
    )
}