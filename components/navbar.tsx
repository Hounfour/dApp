import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { ConnectWallet, darkTheme } from '@thirdweb-dev/react';

export default function NavBar() {
    const customDarkTheme = darkTheme({
        fontFamily: "serif",
        colors: {
            primaryText: "#cb6a1a",
            secondaryText: "#a9a8a7",
            accentText: "#1a681e",
            // danger: "",
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
    return (
        <div className={styles.navbarContainer}>
            <Link href="/">
                <p className={styles.gradientText1}
                    style={{
                        cursor: 'pointer',
                        fontSize: '1.2 rem',
                        fontWeight: 'bold'
                    }}>
                    Portfolio
                </p>
            </Link>
            <ConnectWallet 
                btnTitle='Sign In'
                modalTitle='Select sign in method'

                modalSize="compact"

                termsOfServiceUrl="https://discord.com/channels/1015984378297450576/1174037557902839828/1174044945758294216"
                privacyPolicyUrl="https://discord.com/channels/1015984378297450576/1174037138774429717/1174037138774429717"

                theme={customDarkTheme}
                switchToActiveChain={true}
                hideTestnetFaucet={true}

                displayBalanceToken={{
                    137: "0x2fDC9FbF4C076d3F45FF2864E87c3352c726FC39"
                }}

                detailsBtn={() => {
                    return <p>Profile</p>
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
    )
}