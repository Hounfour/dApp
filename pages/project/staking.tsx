import { Web3Button, useAddress, useContract, useContractMetadata, useContractRead, useOwnedNFTs, useTokenBalance } from '@thirdweb-dev/react';
import styles from '../../styles/Home.module.css';
import { BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { BTN_ERC20_CONTRACT_ADDRESS, MASKS_ERC721_CONTRACT_ADDRESS, MASK_STAKING_CONTRACT_ADDRESS } from '../../constants/addresses';
import HeroCard from '../../components/hero-card';
import StakeNFTCard from '../../components/stake-nft-card';
import StakedNFTCard from '../../components/staked-nft-card';

export default function StakingProject() {
    const address = useAddress();
    
    const [claimableRewards, setClaimableRewards] = useState<BigNumber>();

    const {
        contract: stakingContract
    } = useContract(MASK_STAKING_CONTRACT_ADDRESS);
    const {
        contract: ERC20Contract
    } = useContract(BTN_ERC20_CONTRACT_ADDRESS);
    const {
        contract: ERC721Contract
    } = useContract(MASKS_ERC721_CONTRACT_ADDRESS, "nft-drop");

    const {
        data: stakingContractMetadata,
        isLoading: stakingContractMetadataIsLoading,
    } = useContractMetadata(stakingContract);

    const {
        data: tokenBalance,
        isLoading: tokenBalanceIsLoading,
    } = useTokenBalance(ERC20Contract, address)

    const {
        data: ownedERC721Tokens,
        isLoading: ownedERC721TokensIsLoading
    } = useOwnedNFTs(ERC721Contract, address);

    const {
        data: stakedERC721Tokens,
        isLoading: isStakedERC721TokensLoading,
    } = useContractRead(
        stakingContract,
        "getStakeInfo",
        [address]
    );

    useEffect(() => {
        if (!stakingContract || !address) return;

        async function getClaimableRewards() {
            const claimableRewards = await stakingContract?.call(
                "getStakeInfo",
                [address]
            );

            setClaimableRewards(claimableRewards[1]);
        };

        getClaimableRewards();
    }, [address, stakingContract]);

    return (
        <div className={styles.container}>
            <div className={styles.contractPage}>
                <HeroCard
                    isLoading={stakingContractMetadataIsLoading}
                    title={stakingContractMetadata?.name!}
                    description={stakingContractMetadata?.description!}
                    image={stakingContractMetadata?.image!}
                />
                <div className={styles.grid}>
                    <div className={styles.componentCard}>
                        <h3>Rewards</h3>
                        {tokenBalanceIsLoading ? (
                            <p>Loading Balance...</p>
                        ) : (
                            <p>Balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}</p>
                        )}
                        {claimableRewards && (
                            <p>Reward balance: {ethers.utils.formatEther(claimableRewards)}</p>
                        )}
                        <Web3Button
                            contractAddress={MASK_STAKING_CONTRACT_ADDRESS}
                            action={(contract) => contract.call("claimRewards")}
                            onSuccess={() => {
                                alert("Rewards claimed!");
                                setClaimableRewards(ethers.constants.Zero);
                            }}
                            isDisabled={!claimableRewards || claimableRewards.isZero()}
                            >Claim Rewards</Web3Button>
                        </div>
                        <div className={styles.componentCard}>
                            <h3>Unstaked</h3>
                            {ownedERC721TokensIsLoading ? (
                                <p>Loading...</p>
                            ) : (
                                ownedERC721Tokens && ownedERC721Tokens.length > 0 ? (
                                    ownedERC721Tokens.map((nft) => (
                                        <div key={nft.metadata.id} className={styles.nftGrid}>
                                            <StakeNFTCard
                                                nft={nft}
                                            />
                                        </div>
                                    ))
                            ) : (
                                <p>No NFTs owned.</p>
                            )
                        )}
                    </div>
                    <div className={styles.componentCard}>
                        <h3>Staked</h3>
                        {isStakedERC721TokensLoading ? (
                            <p>Loading...</p>
                        ) : (
                            stakedERC721Tokens && stakedERC721Tokens.length > 0 ? (
                                stakedERC721Tokens[0].map((stakedNFT: BigNumber, index: number) => (
                                    <div key={index} className={styles.nftGrid}>
                                        <StakedNFTCard
                                            tokenId={stakedNFT.toNumber()}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p>No NFTs Staked.</p>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}