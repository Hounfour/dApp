import {
  ThirdwebNftMedia,
  Web3Button,
  useAddress,
  useContract,
} from "@thirdweb-dev/react";
import {
  DOLLS_ERC721_CONTRACT_ADDRESS,
  DOLLS_STAKING_CONTRACT_ADDRESS,
} from "../constants/addresses";
import { NFT } from "@thirdweb-dev/sdk";
import styles from "../styles/collections.module.css";

type NFTProps = {
  nft: NFT;
};

export default function StakeDollCard({ nft }: NFTProps) {
  const address = useAddress();

  const { contract: dollMintContract } = useContract(
    DOLLS_ERC721_CONTRACT_ADDRESS,
    "nft-drop"
  );
  const { contract: dollStakingContract } = useContract(
    DOLLS_STAKING_CONTRACT_ADDRESS
  );

  async function stakeNFT(nftId: number[]) {
    if (!address) return;

    const isApproved = await dollMintContract?.isApproved(
      address,
      DOLLS_STAKING_CONTRACT_ADDRESS
    );

    if (!isApproved) {
      await dollMintContract?.setApprovalForAll(
        DOLLS_STAKING_CONTRACT_ADDRESS,
        true
      );
    }

    await dollStakingContract?.call("stake", [nftId]);
  }

  return (
    <div className={styles.card}>
      <ThirdwebNftMedia metadata={nft.metadata} width="100%" height="auto" />
      <div className={styles.nftInfoContainer}>
        <p className={styles.nftName}>{nft.metadata.name}</p>
        <p className={styles.nftTokenId}>Token ID#{nft.metadata.id}</p>
      </div>
      <Web3Button
        contractAddress={DOLLS_STAKING_CONTRACT_ADDRESS}
        action={() => stakeNFT([parseInt(nft.metadata.id)])}
        style={{ width: "100%" }}
      >
        Stake
      </Web3Button>
    </div>
  );
}
