import {
  ThirdwebNftMedia,
  Web3Button,
  useAddress,
  useContract,
  useNFTs,
  useOwnedNFTs,
  useTokenBalance,
} from "@thirdweb-dev/react";
import {
  BUTN_ERC20_CONTRACT_ADDRESS,
  DOLLS_ERC721_CONTRACT_ADDRESS,
} from "../constants/addresses";
import { useState } from "react";

export default function UserProfile() {
  const address = useAddress();

  const { contract: tokenContract } = useContract(BUTN_ERC20_CONTRACT_ADDRESS);
  const { contract: dollsContract } = useContract(
    DOLLS_ERC721_CONTRACT_ADDRESS
  );

  const { data: ownedNFTs, isLoading: isOwnedNFTsLoading } = useOwnedNFTs(
    dollsContract,
    address
  );
  const { data: tokenBalance, isLoading: isTokenBalanceLoading } =
    useTokenBalance(tokenContract, address);
  const { data: nfts, isLoading: isNFTsLoading } = useNFTs(dollsContract);

  function truncateAddress(address: string) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<boolean>(false);
  const [nftTokenId, setNFTTokenId] = useState<string>();

  return (
    <div>
      {address && (
        <>
          <h1>Hounfour Profile</h1>
          <h3>
            Welcome back <span>{truncateAddress(address!)}</span>
          </h3>
          <div>
            {!isTokenBalanceLoading && (
              <p>Token Balance: {tokenBalance?.displayValue}</p>
            )}
            <button onClick={() => setIsShopModalOpen(true)}>Shop NFTs</button>
          </div>
          <h3>Your NFTs</h3>
          <div>
            {!isOwnedNFTsLoading &&
              (ownedNFTs && ownedNFTs.length > 0 ? (
                ownedNFTs.map((nft: any, index: number) => (
                  <div key={index}>
                    <ThirdwebNftMedia
                      metadata={nft.metadata}
                      style={{
                        overflow: "hidden",
                        borderRadius: "6px",
                      }}
                    />
                    <p>{nft.metadata.name}</p>
                  </div>
                ))
              ) : (
                <p>No NFTs</p>
              ))}
          </div>
          {isShopModalOpen && (
            <div>
              <div>
                <button>X</button>
                <div>
                  <h1>Shop NFTs</h1>
                  <h3>Select NFT to purchase:</h3>
                </div>
                <div>
                  {!isNFTsLoading &&
                    nfts &&
                    nfts.slice(1).map((nft: any, index: number) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedNFT(true);
                          setNFTTokenId(nft.metadata.id);
                          console.log(nft.metadata.id);
                        }}
                        style={{
                          backgroundColor:
                            selectedNFT && nftTokenId === nft.metadata.id
                              ? "#333"
                              : "#1b1b1b",
                        }}
                      >
                        <ThirdwebNftMedia
                          metadata={nft.metadata}
                          style={{
                            overflow: "hidden",
                            borderRadius: "6px",
                          }}
                        />
                        <p>{nft.metadata.name}</p>
                      </div>
                    ))}
                </div>
                <div>
                  <Web3Button
                    contractAddress={DOLLS_ERC721_CONTRACT_ADDRESS}
                    action={(contract) => contract.erc721.mint(nftTokenId!)}
                    onSuccess={() => {
                      setSelectedNFT(false);
                      setNFTTokenId(undefined);
                      setIsShopModalOpen(false);
                    }}
                  >
                    Mint NFT
                  </Web3Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
