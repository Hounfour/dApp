import { useAddress, useClaimToken, useContract } from "@thirdweb-dev/react";
import { BUTN_ERC20_CONTRACT_ADDRESS } from "../constants/addresses";

const Component = () => {
  const address = useAddress();
  const { contract: butnContract } = useContract(
    BUTN_ERC20_CONTRACT_ADDRESS,
    "token-drop"
  );
  const { mutate: claimTokens, isLoading, error } = useClaimToken(butnContract);

  if (error) {
    console.error("failed to claim tokens", error);
  }

  return (
    <button
      disabled={isLoading}
      onClick={() =>
        claimTokens({
          to: "0xE2f4784Cfa62dC1DE4606fCc105dc64956BAfBa3",
          amount: 100,
        })
      }
    >
      Claim Tokens!
    </button>
  );
};
