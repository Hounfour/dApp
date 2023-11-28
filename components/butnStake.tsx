import { useAddress, useContract, useContractRead, useTokenBalance } from "@thirdweb-dev/react";
import { BTN_ERC20_CONTRACT_ADDRESS, BUTN_ERC20_CONTRACT_ADDRESS, BUTN_STAKING_CONTRACT_ADDRESS } from "../constants/addresses";
import { useEffect, useState } from "react";

export default function Stake() {
    const address = useAddress();

    const { contract: stakeTokenContract } = useContract(BTN_ERC20_CONTRACT_ADDRESS, "token");
    const { contract: rewardTokenContract } = useContract(BUTN_ERC20_CONTRACT_ADDRESS, "token-drop");
    const { contract: stakeContract } = useContract(BUTN_STAKING_CONTRACT_ADDRESS, "custom");

    const { data: stakeTokenBalance, isLoading: loadingStakeTokenBalance} = useTokenBalance(stakeTokenContract, address);

    const { data: rewardTokenBalance, isLoading: loadingRewardTokenBalance} = useTokenBalance(rewardTokenContract, address);

    const { data: stakeInfo, refetch: refetchStakeInfo, isLoading: loadingStakeInfo } = useContractRead(stakeContract, "getStakeInfo", [address]);

    useEffect(() => {
        setInterval(() => {
            refetchStakeInfo();
        }, 10000);
    }, []);

    const [stakeAmount, setStakeAmount] = useState<string>("0");
    const [unstakeAmount, setUnstakeAmount] = useState<string>("0");

    function resetValue() {
        setStakeAmount("0");
        setUnstakeAmount("0");
    }
    

    return (
        <div>
            
        </div>
    );
};