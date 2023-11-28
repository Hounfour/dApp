import {
  useAddress,
  useContract,
  useTokenBalance,
  useTokenSupply,
} from "@thirdweb-dev/react";
import { BTN_ERC20_CONTRACT_ADDRESS } from "../constants/addresses";
import styles from "../styles/collections.module.css";

export default function BTNToken() {
  const address = useAddress();
  const { contract: tokenContract, isLoading: loadingToken } = useContract(
    BTN_ERC20_CONTRACT_ADDRESS
  );
  const { data: tokenBalance, isLoading: loadingTokenBalance } =
    useTokenBalance(tokenContract, address);
  const { data: tokenSupply, isLoading: loadingTokenSupply } =
    useTokenSupply(tokenContract);

  return (
    <div>
      <h1>Stake Token</h1>
      <div>
        <div className={styles.componentCard}>
          <h3 className={styles.gradientText0}>Balance / Supply</h3>
          {loadingToken || loadingTokenBalance || loadingTokenSupply ? (
            <p className={styles.gradientText3}>Loading value...</p>
          ) : (
            <>
              <p className={styles.gradientText1}>
                Balance ($BTN): {tokenBalance?.displayValue}{" "}
                {tokenBalance?.symbol}
              </p>
              <p className={styles.gradientText1}>
                Total Supply ($BTN): {tokenSupply?.displayValue}{" "}
                {tokenSupply?.symbol}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
