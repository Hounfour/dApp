import Link from 'next/link';
import styles from '../styles/navBar.module.css';
import { ConnectWallet, darkTheme, embeddedWallet, metamaskWallet, smartWallet, useAddress, useConnect, useContract, useOwnedNFTs } from '@thirdweb-dev/react';
import { MASKS_ERC721_CONTRACT_ADDRESS, SMART_WALLET_CONTRACT_ADDRESS } from '../constants/addresses';
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
        scrollbarBg: "#131313",
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

const embeddedWalletConfig = embeddedWallet();
const smartEmbeddedWalletConfig = smartWallet(embeddedWalletConfig, {
    factoryAddress: SMART_WALLET_CONTRACT_ADDRESS,
    gasless: true,
});

const metaMaskWalletConfig = metamaskWallet();
const smartMetaMaskWalletConfig = smartWallet(metaMaskWalletConfig, {
    factoryAddress: SMART_WALLET_CONTRACT_ADDRESS,
    gasless: true,
});

export default function NavBar() {
    const address = useAddress();
    const connect = useConnect();

    const [emailInput, setEmailInput] = useState("");
    const [personalEmbeddedWalletAddress, setPersonalEmbeddedWalletAddress] = useState<string | undefined>(undefined)
    const [personalMetaMaskWalletAddress, setPersonalMetaMaskWalletAddress] = useState<string | undefined>(undefined)

    const [smartEmbeddedWalletAddress, setSmartEmbeddedWalletAddress] = useState<string | undefined>(undefined)
    const [smartMetaMaskWalletAddress, setSmartMetaMaskWalletAddress] = useState<string | undefined>(undefined)

    const handleLogin = async () => {
        try {
            const personalEmbeddedWallet = await connect(embeddedWalletConfig);
            const personalMetaMaskWallet = await connect(metaMaskWalletConfig);


            const personalMetaMaskWalletAddress = await personalMetaMaskWallet.getAddress();

            setPersonalEmbeddedWalletAddress(personalEmbeddedWalletAddress);
            setPersonalMetaMaskWalletAddress(personalMetaMaskWalletAddress);

            const smartEmbeddedWallet = await connect(smartEmbeddedWalletConfig, {
                personalWallet: personalEmbeddedWallet,
                chainId: 137,
            });
            const smartEmbeddedWalletAddress = await smartEmbeddedWallet.getAddress();
            setSmartEmbeddedWalletAddress(smartEmbeddedWalletAddress);

            const smartMetaMaskWallet = await connect(smartMetaMaskWalletConfig, {
                personalWallet: personalMetaMaskWallet,
                chainId: 137,
            });
            const smartMetaMaskWalletAddress = await smartMetaMaskWallet.getAddress();
            setSmartMetaMaskWalletAddress(smartMetaMaskWalletAddress);

            setEmailInput("");
        } catch (error) {
            console.error(error);
        }
    };

    const { contract } = useContract(MASKS_ERC721_CONTRACT_ADDRESS);

    const {
        data: personalOwnedNFTs,
        isLoading: isOwnedNFTsLoading,
    } = useOwnedNFTs(contract, personalEmbeddedWalletAddress);

    const {
        data: smartOwnedNFTs,
        isLoading: isSmartOwnedNFTsLoading,
    } = useOwnedNFTs(contract, smartEmbeddedWalletAddress);

    const {
        data: personalMetaMaskOwnedNFTs,
        isLoading: isMetaMaskOwnedNFTsLoading,
    } = useOwnedNFTs(contract, personalMetaMaskWalletAddress);

    const {
        data: smartMetaMaskOwnedNFTs,
        isLoading: isSmartMetaMaskOwnedNFTsLoading,
    } = useOwnedNFTs(contract, smartMetaMaskWalletAddress);
    
    return (
        <div className={styles.navbarContainer}>
            <Link href="/">
                <p className={styles.gradientText0}>
                    Home
                </p>
            </Link>
            <ConnectWallet 
                btnTitle='Sign In'
                modalSize="compact"
                modalTitle='Hounfour NFT|LCG'
                theme={customDarkTheme}
                switchToActiveChain={true}
                hideTestnetFaucet={true}
                modalTitleIconUrl='https://cdn.discordapp.com/attachments/1015369955950198946/1176503609769349151/hounfour-website-favicon-color_1.png?ex=656f1b5e&is=655ca65e&hm=e9c5240e7b9d62118ba11fa32696d16da8ba34a8d4590318bf86364a8530098d&'
                termsOfServiceUrl="https://discord.com/channels/1015984378297450576/1174037557902839828/1174044945758294216"
                privacyPolicyUrl="https://discord.com/channels/1015984378297450576/1174037138774429717/1174037138774429717"
                displayBalanceToken={{
                    137: "0x2fDC9FbF4C076d3F45FF2864E87c3352c726FC39"
                }}
                detailsBtn={() => {
                    return (
                        <p className={styles.gradientText1}>WALLET</p>
                    );
                }}
                supportedTokens={{
                    [137]: [
                        {
                            address: "0x2fDC9FbF4C076d3F45FF2864E87c3352c726FC39",
                            name: "Butn's",
                            symbol: "BTN",
                            icon: "https://cdn.discordapp.com/attachments/1015369955950198946/1172913080821350510/But_n.png?ex=65620b6e&is=654f966e&hm=a4f4c4ac711d92a3070a851ee08834c87868bb31a076545179e39b8d31f92d45&",
                        },
                        {
                            address: "0xc8528D8058aA72b59e94127DD38F43a01b201bD9",
                            name: "Toke",
                            symbol: "TOKE",
                            icon: "https://cdn.discordapp.com/attachments/1095276696204214323/1172162699988320309/stantonnft_None_db262539-725a-4397-92d9-242a9f8e1283.png?ex=655f5095&is=654cdb95&hm=39e82961136b10e839664b642a844ab967801cf8e369a9f5f7e6862204d56324&",
                        }
                    ]
                }}
            />
        </div>
    );
}