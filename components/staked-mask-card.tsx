import styles from "../styles/collections.module.css";
import {
  ThirdwebNftMedia,
  Web3Button,
  useContract,
  useNFT,
} from "@thirdweb-dev/react";
import {
  MASKS_ERC721_CONTRACT_ADDRESS,
  MASK_STAKING_CONTRACT_ADDRESS,
} from "../constants/addresses";

type NFTProps = {
  tokenId: number;
};

export default function StakedMaskCard({ tokenId }: NFTProps) {
  const { contract: ERC721Contract } = useContract(
    MASKS_ERC721_CONTRACT_ADDRESS,
    "nft-drop"
  );
  const { contract: stakingContract } = useContract(
    MASK_STAKING_CONTRACT_ADDRESS
  );

  const { data: nftMetadata, isLoading: nftMetadataIsLoading } = useNFT(
    ERC721Contract,
    tokenId
  );

  const handleUnstake = async () => {
    if (!stakingContract) return;

    try {
      // Implement confirmation modal/dialog here

      await stakingContract.call("withdraw", [[tokenId]]);
      // Handle success - maybe show a success message
    } catch (error) {
      // Handle error - show an error message or log it
      console.error("Error unstaking:", error);
    }
  };

  return (
    <div className={styles.card}>
      {nftMetadataIsLoading ? (
        <p>Loading NFT metadata...</p>
      ) : (
        <>
          <ThirdwebNftMedia
            metadata={nftMetadata?.metadata!}
            width="100%"
            height="auto"
          />
          <div className={styles.nftInfoContainer}>
            {/* Ensure nftMetadata exists before accessing its properties */}
            <p className={styles.nftName}>{nftMetadata?.metadata?.name}</p>
            <p className={styles.nftTokenId}>Token: #{tokenId}</p>
          </div>
          <Web3Button
            contractAddress={MASK_STAKING_CONTRACT_ADDRESS}
            action={(contract) => handleUnstake()}
            style={{
              width: "100%",
            }}
          >
            Unstake
          </Web3Button>
        </>
      )}
    </div>
  );
}
