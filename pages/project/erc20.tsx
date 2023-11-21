import HeroCard from '../../components/hero-card'
import styles from '../../styles/Home.module.css'
import { Web3Button, darkTheme, useAddress, useContract, useContractMetadata, useTokenBalance, useTokenSupply } from '@thirdweb-dev/react'
import { BTN_ERC20_CONTRACT_ADDRESS } from '../../constants/addresses'
import Link from 'next/link';

export default function ERC20Project() {
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
    })

    const address = useAddress();

    const {
        contract
    } = useContract(BTN_ERC20_CONTRACT_ADDRESS, "token");

    const {
        data: contractMetadata,
        isLoading: contractMetadataIsLoading,
    } = useContractMetadata(contract);

    const {
        data: tokenSupply,
        isLoading: tokenSupplyIsLoading
    } = useTokenSupply(contract);

    const {
        data: tokenBalance,
        isLoading: tokenBalanceIsLoading,
    } = useTokenBalance(contract, address)

    return (
        <div className={styles.container}>
            <HeroCard
                isLoading={contractMetadataIsLoading}
                title={contractMetadata?.name!}
                description={contractMetadata?.description!}
                image={contractMetadata?.image!}
            />
            <div className={styles.grid}>
                <div className={styles.componentCard}>
                    <h3 className={styles.gradientText0}>Token Stats</h3>
                    {tokenSupplyIsLoading ? (
                        <p className={styles.gradientText3}>Loading supply...</p>
                    ) : (
                            <p className={styles.gradientText1}>Total supply: {tokenSupply?.displayValue} {tokenSupply?.symbol}</p>
                    )}   
                </div>
                <div className={styles.componentCard}>
                    <h3 className={styles.gradientText0}>Token Balance</h3>
                    {tokenBalanceIsLoading ? (
                        <p className={styles.gradientText3}>Loading balance...</p>
                    ) : (
                        <p className={styles.gradientText1}>Balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}</p>
                    )}
                    <Web3Button
                        contractAddress={BTN_ERC20_CONTRACT_ADDRESS}
                        action={(contract) => contract.erc20.burn(10)}
                        theme={customDarkTheme}
                    >Burn 10 Butns</Web3Button>
                </div>
                <div className={styles.componentCard}>
                    <h3 className={styles.gradientText0}>Earn Tokens</h3>
                    <p className={styles.gradientText1}>Earn more butns by staking an ERC721 NFT.</p>
                    <div>
                        <Link href='/project/staking'>
                            <button className={styles.connectButtonBg}>Stake ERC721</button>
                        </Link>
                        <Link href='/project/erc721'>
                            <button className={styles.matchButton}>Claim ERC721</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}