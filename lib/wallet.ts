import {
  LocalWallet,
  SmartWallet,
  ThirdwebSDK,
  isContractDeployed,
} from "@thirdweb-dev/react";
import {
  BUTN_ERC20_CONTRACT_ADDRESS,
  SMART_WALLET_CONTRACT_ADDRESS,
} from "../constants/addresses";
import {} from "@thirdweb-dev/chains";

const chain = 137;

export function createSmartWallet(): SmartWallet {
  const smartWallet = new SmartWallet({
    chain: "polygon",
    factoryAddress: SMART_WALLET_CONTRACT_ADDRESS,
    gasless: true,
    clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID,
  });
  return smartWallet;
}

export async function connectSmartWallet(
  password: string,
  statusCallBack: (status: string) => void
): Promise<SmartWallet> {
  statusCallBack("Searching for trainer account...");
  const smartWallet = createSmartWallet();
  const personalWallet = new LocalWallet();
  await personalWallet.loadOrCreate({
    strategy: "encryptedJson",
    password: password,
  });
  await smartWallet.connect({
    personalWallet,
  });

  const sdk = await ThirdwebSDK.fromWallet(smartWallet, chain, {
    clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID,
  });

  const address = await sdk.wallet.getAddress();
  const isDeployed = await isContractDeployed(address, sdk.getProvider());

  if (!isDeployed) {
    statusCallBack("New account detected...");
    const butnContract = await sdk.getContract(BUTN_ERC20_CONTRACT_ADDRESS);

    statusCallBack("Creating new account...");
    const tx1 = await butnContract.erc20.claim.prepare(500);
    const tx2 = await butnContract.erc20.claim.prepare(500);
    const transactions = [tx1, tx2];

    statusCallBack("Sending initial funds...");
    const batchTx = await smartWallet.executeBatch(transactions);
  } else {
    statusCallBack("Trainer account found!");
  }
  return smartWallet;
}
