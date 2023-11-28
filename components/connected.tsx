import { ThirdwebSDKProvider } from "@thirdweb-dev/react";
import { Signer } from "ethers";
import NavBar from "./navbar";

export const Connected = ({ signer }: { signer: Signer }) => {
  return (
    <ThirdwebSDKProvider
      signer={signer}
      activeChain={"polygon"}
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
    >
      <ConnectedComponents />
    </ThirdwebSDKProvider>
  );
};

const ConnectedComponents = () => {
  return (
    <div>
      <NavBar />
    </div>
  );
};
