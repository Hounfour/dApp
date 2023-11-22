import { ThirdwebNftMedia, Web3Button, darkTheme, useAddress, useClaimedNFTSupply, useContract, useContractMetadata, useOwnedNFTs, useTotalCount } from '@thirdweb-dev/react'
import HeroCard from '../../components/hero-card'
import styles from '../../styles/Home.module.css'
import { DOLLS_ERC721_CONTRACT_ADDRESS } from '../../constants/addresses'
import Link from 'next/link';
import { useState } from 'react';

const customDarkTheme = darkTheme({
    fontFamily: "serif",
    colors: {
        primaryText: "#cb6a1a",
        secondaryText: "#a9a8a7",
        accentText: "#1a681e",
        //danger: "",
        // success: "",
        // modalOverlayBg: "",
        accentButtonBg: "#1a681e",
        accentButtonText: "#320647",
        primaryButtonBg: "#320647",
        primaryButtonText: "#cb6a1a",
        secondaryButtonBg: "#1a681e",
        secondaryButtonText: "#bebdc7",
        secondaryButtonHoverBg: "#cb6a1a",
        modalBg: "#320647",
        dropdownBg: "#320647",
        // tooltipBg: "",
        // tooltipText: "",
        // inputAutofillBg: "",
        // scrollbarBg: "",
        walletSelectorButtonHoverBg: "#1a681e",
        separatorLine: "#552d0c",
        secondaryIconColor: "#bebdc7",
        secondaryIconHoverBg: "",
        secondaryIconHoverColor: "#ff0000",
        // borderColor: "",
        // skeletonBg: "",
        // selectedTextColor: "",
        // selectedTextBg: "",
        connectedButtonBg: "#552d0c",
        connectedButtonBgHover: "#1a681e"
    }
});

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

    const [quantity, setQuantity] = useState(1); // State to track the quantity

    return (
        <div className={styles.container}>
            <div className={styles.contractPage}>
                <HeroCard
                    isLoading={contractMetadataIsLoading}
                    title={contractMetadata?.name!}
                    description={contractMetadata?.description!}
                    image={contractMetadata?.image!}
                />
                <div className={styles.heroCardContent}>
                    <div className={styles.componentCard}>
                        <h3 className={styles.gradientText0}>Contract Stats</h3>
                        <p className={styles.gradientText1}>
                            Total Supply:
                            {totalSupplyIsLoading ? (
                                "Loading..."
                            ) : (
                                ` ${totalSupply?.toNumber()}`
                            )}
                        <p className={styles.gradientText1}>
                            Total Claimed:
                            {totalClaimedSupplyIsLoading ? (
                                "Loading..."
                            ) : (
                                ` ${totalClaimedSupply?.toNumber()}`
                            )}
                        <p className={styles.gradientText1}>
                            Total Owned:
                            {ownedNFTsIsLoading ? (
                                "Loading..."
                            ) : (
                                ` ${ownedNFTs?.length}`
                            )}
                        </p>
                        </p>
                        </p>
                    </div>
                    <div className={styles.componentCard}>
                        <h3 className={styles.gradientText0}>Mint a Hounfour Doll</h3>
                        <p className={styles.gradientText1}>33 MATIC | 33k $BTN</p>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                        />
                        <Web3Button
                            contractAddress={DOLLS_ERC721_CONTRACT_ADDRESS}
                            action={(contract) => contract.erc721.claim(quantity)}
                            onSubmit={() => alert(`Minting ${quantity} NFT(s)`)} // Alert with the selected quantity
                            onSuccess={() => alert(`NFTs Minted to wallet! Quantity: ${quantity}`)} // Alert success with quantity
                            onError={() => alert("Mint Failed to process.")}
                            theme={customDarkTheme}
                        >Mint Doll</Web3Button>
                    </div>
                </div>
                <div className={styles.container}>
                    <h2 className={styles.gradientText0}> My NFTs:</h2>
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