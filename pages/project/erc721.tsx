import {
    Web3Button,
    darkTheme,
    useAddress,
    useClaimedNFTSupply,
    useContract,
    useContractMetadata,
    useContractRead,
    useOwnedNFTs,
    useTokenBalance,
    useTotalCount
} from '@thirdweb-dev/react'
import HeroCard from '../../components/hero-card'
import styles from '../../styles/Home.module.css'
import {
    BTN_ERC20_CONTRACT_ADDRESS,
    DOLLS_ERC721_CONTRACT_ADDRESS,
    DOLLS_STAKING_CONTRACT_ADDRESS
} from '../../constants/addresses'
import { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import StakeDollCard from '../../components/stake-doll-card';
import StakedDollCard from '../../components/staked-doll-card';

const customDarkTheme = darkTheme({
    fontFamily: "serif",
    colors: {
        primaryText: "#cb6a1a",
        secondaryText: "#a9a8a7",
        accentText: "#1a681e",
        accentButtonBg: "#1a681e",
        accentButtonText: "#320647",
        primaryButtonBg: "#320647",
        primaryButtonText: "#cb6a1a",
        secondaryButtonBg: "#1a681e",
        secondaryButtonText: "#bebdc7",
        secondaryButtonHoverBg: "#cb6a1a",
        modalBg: "#320647",
        dropdownBg: "#320647",
        walletSelectorButtonHoverBg: "#1a681e",
        separatorLine: "#552d0c",
        secondaryIconColor: "#bebdc7",
        secondaryIconHoverBg: "",
        secondaryIconHoverColor: "#ff0000",
        connectedButtonBg: "#552d0c",
        connectedButtonBgHover: "#1a681e"
    }
});

export default function ERC721Project() {
    const smartWalletAddress = useAddress();

    const [claimableRewards, setClaimableRewards] = useState<BigNumber>();

    const {
        contract: nftContract
    } = useContract(DOLLS_ERC721_CONTRACT_ADDRESS, "nft-drop");
    const {
        contract: butnContract
    } = useContract(BTN_ERC20_CONTRACT_ADDRESS);
    const {
        contract: stakingContract
    } = useContract(DOLLS_STAKING_CONTRACT_ADDRESS);

    const {
        data: nftContractMetadata,
        isLoading: nftContractMetadataIsLoading,
    } = useContractMetadata(nftContract);

    const {
        data: tokenBalance,
        isLoading: tokenBalanceIsLoading,
    } = useTokenBalance(butnContract, smartWalletAddress)

    const {
        data: ownedNFTs,
        isLoading: ownedNFTsIsLoading,
    } = useOwnedNFTs(nftContract, smartWalletAddress);

    const {
        data: stakedNFTs,
        isLoading: isStakedNFTsLoading,
    } = useContractRead(
        stakingContract,
        "getStakeInfo",
        [smartWalletAddress]
    );

    useEffect(() => {
        if (!stakingContract || !smartWalletAddress) return;

        async function getClaimableRewards() {
            try {
                const claimableRewards = await stakingContract?.call("getStakeInfo", [smartWalletAddress]);
                setClaimableRewards(claimableRewards[1]);
            } catch (error) {
                alert("Error fetching claimable rewards. Please try again.");
                // Handle the error accordingly
                console.error(error);
            }
        }

        getClaimableRewards();
    }, [smartWalletAddress, stakingContract]);

    const {
        data: totalSupply,
        isLoading: totalSupplyIsLoading,
    } = useTotalCount(nftContract);

    const {
        data: totalClaimedSupply,
        isLoading: totalClaimedSupplyIsLoading,
    } = useClaimedNFTSupply(nftContract)

    const [quantity, setQuantity] = useState(1); // State to track the quantity

    return (
    <div className={styles.container}>
            <div className={styles.grid}>
                {claimableRewards && (
                    <p className={styles.gradientText1}>REWARDS EARNED: {ethers.utils.formatEther(claimableRewards)} 👉</p>
                )}
                <Web3Button
                    contractAddress={DOLLS_STAKING_CONTRACT_ADDRESS}
                    action={(contract) => contract.call("claimRewards")}
                    onSubmit={() => alert(`Claiming Rewards`)} // Alert with the selected quantity
                    onSuccess={() => alert(`Rewards claimed to wallet!`)} // Alert success with quantity
                    onError={() => alert("Claim Failed to process.")}
                    isDisabled={!claimableRewards || claimableRewards.isZero()}
                    theme={customDarkTheme}
                >CLAIM</Web3Button>
                <p className={styles.gradientText1}>MINT PRICE: 33 MATIC 👉</p>
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
                >MINT</Web3Button>
        </div>
        <div className={styles.contractPage}>
            <HeroCard
                isLoading={nftContractMetadataIsLoading}
                title={nftContractMetadata?.name!}
                description={nftContractMetadata?.description!}
                image={nftContractMetadata?.image!}
            />
            </div>
            <div className={styles.grid}>
                <div>
                    <h3 className={styles.gradientText0}>Contract Stats</h3>
                    <p className={styles.gradientText1}>
                        Total Supply:
                        {totalSupplyIsLoading ? (
                            "Loading..."
                        ) : (
                            ` ${totalSupply?.toNumber()}`
                        )}
                    </p>
                    <p className={styles.gradientText1}>
                        Total Claimed:
                        {totalClaimedSupplyIsLoading ? (
                            "Loading..."
                        ) : (
                            ` ${totalClaimedSupply?.toNumber()}`
                        )}
                    </p>
                </div>
                <div>
                    <h3 className={styles.gradientText0}>Rewards</h3>
                    <p className={styles.gradientText1}>
                        NFTs Owned:
                        {ownedNFTsIsLoading ? (
                            "Loading..."
                        ) : (
                            ` ${ownedNFTs?.length}`
                        )}
                    </p>
                    {tokenBalanceIsLoading ? (
                        <p>Loading Balance...</p>
                    ) : (
                            <p className={styles.gradientText1}>Balance: {Number(tokenBalance?.displayValue).toFixed(1)} {tokenBalance?.symbol}</p>
                    )}
                </div>
                <div>
                    <h3 className={styles.gradientText0}>Unstaked</h3>
                    {ownedNFTsIsLoading ? (
                        <p>Loading...</p>
                    ) : (
                        ownedNFTs && ownedNFTs.length > 0 ? (
                            ownedNFTs.map((nft) => (
                                <div key={nft.metadata.id} className={styles.nftGrid}>
                                    <StakeDollCard
                                        nft={nft}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className={styles.gradientText1}>No NFTs owned.</p>
                        )
                    )}
                </div>
                <div>
                    <h3 className={styles.gradientText0}>Staked</h3>
                    {isStakedNFTsLoading ? (
                        <p>Loading...</p>
                    ) : (
                        stakedNFTs && stakedNFTs.length > 0 ? (
                            stakedNFTs[0].map((stakedNFT: BigNumber, index: number) => (
                                <div key={index} className={styles.nftGrid}>
                                    <StakedDollCard
                                        tokenId={stakedNFT.toNumber()}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className={styles.gradientText1}>No NFTs owned.</p>
                        )
                    )}
                </div>
            </div>
            </div>
    );
};