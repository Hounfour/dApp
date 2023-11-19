import { ThirdwebNftMedia, Web3Button, useAddress, useClaimedNFTSupply, useContract, useContractMetadata, useOwnedNFTs, useTotalCount } from '@thirdweb-dev/react'
import HeroCard from '../../components/hero-card'
import styles from '../../styles/Home.module.css'
import { DOLLS_ERC721_CONTRACT_ADDRESS } from '../../constants/addresses'
import Link from 'next/link';

export default function ERC721Project() {
    const address = useAddress();

    const {
        contract
    } = useContract(DOLLS_ERC721_CONTRACT_ADDRESS, "nft-drop");

    const {
        data: contractMetadata,
        isLoading: contractMetadataIsLoading,
    } = useContractMetadata(contract);

    const {
        data: totalSupply,
        isLoading: totalSupplyIsLoading,
    } = useTotalCount(contract);

    const {
        data: totalClaimedSupply,
        isLoading: totalClaimedSupplyIsLoading,
    } = useClaimedNFTSupply(contract)

    const {
        data: ownedNFTs,
        isLoading: ownedNFTsIsLoading,
    } = useOwnedNFTs(contract, address);

    return (
        <div className={styles.container}>
            <div className={styles.contractPage}>
                <HeroCard
                    isLoading={contractMetadataIsLoading}
                    title={contractMetadata?.name!}
                    description={contractMetadata?.description!}
                    image={contractMetadata?.description!}
                />
                <div className={styles.grid}>
                    <div className={styles.componentCard}>
                        <h3>Claim ERC721</h3>
                        <p>Claim ERC721 NFT for FREE!</p>
                        <Web3Button
                            contractAddress={DOLLS_ERC721_CONTRACT_ADDRESS}
                            action={(contract) => contract.erc721.claim(1)}
                            onSubmit={() => alert("Claiming NFT")}
                            onSuccess={() => alert("NFT Claimed!")}
                            onError={() => alert("Claim Failed")}
                        />
                    </div>
                    <div className={styles.componentCard}>
                        <h3>Contract Stats</h3>
                            <p>
                                Total Supply:
                                {totalSupplyIsLoading ? (
                                    "Loading..."
                                 ) : (
                                    ` ${totalSupply?.toNumber()}`
                                )}
                            </p>
                            <p>
                                Total Claimed:
                                {totalClaimedSupplyIsLoading ? (
                                    "Loading..."
                                ) : (
                                    ` ${totalClaimedSupply?.toNumber()}`
                                )}
                            </p>
                    </div>
                    <div className={styles.componentCard}>
                        <h3>Your NFTs</h3>
                        <p>
                            Total Owned:
                            {ownedNFTsIsLoading ? (
                                "Loading..."
                            ) : (
                                ` ${ownedNFTs?.length}`
                            )}
                        </p>
                    </div>
                </div>
                <div className={styles.container}>
                        <h2> My NFTs:</h2>
                        <div className={styles.grid} style={{justifyContent: "flex-start"}}>
                                {ownedNFTsIsLoading ? (
                                    <p>Loading...</p>
                                ) : (
                                    ownedNFTs?.map((nft) => (
                                        <div className={styles.card} key={nft.metadata.id}>
                                            <ThirdwebNftMedia
                                                metadata={nft.metadata}
                                            />
                                            <div className={styles.cardText}>
                                                <h2>{nft.metadata.name}</h2>
                                            </div>
                                            <Link href={`/projects/staking`}>
                                                <button
                                                    className={styles.matchButton}
                                                    style={{
                                                        width: "100%",
                                                        borderRadius: "0 0 10px 10px",
                                                    }}
                                                >Stake NFT</button>
                                            </Link>
                                        </div>
                                    ))
                                )}
                        </div>
                </div>
            </div>
        </div>
    )
}