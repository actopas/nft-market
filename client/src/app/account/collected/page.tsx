/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-19 15:28:19
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-27 15:16:39
 */
"use client";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import NftTable from "@/components/NftTable";
import { findNftsByIds, updateNft } from "@/api";
import { NftSummary } from "@/api/nfts/nft.d";
import { useAuth } from "@/context/AuthContext";
import SimpleNft from "@/contract/SimpleNFT.json";
interface NftTableProps {
  nfts: NftSummary[];
  handleUpdateSaleStatus: (id: string) => void;
}

const ProfilePage: React.FC = () => {
  const { userInfo, refreshUserInfo, account, web3 } = useAuth();
  const [nfts, setNfts] = useState<NftSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateSaleStatus = async (
    status: number,
    id: string,
    tokenId: string
  ) => {
    try {
      // 获取用户的账户地址
      const fromAddress = account || "";

      // 获取NFT合约地址和实例
      const nftContractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS; // 从环境变量中获取NFT合约地址
      const MarketContractAddress =
        process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS;
      if (!nftContractAddress) {
        throw new Error(
          "NFT contract address is not defined in environment variables"
        );
      }
      console.log("test", web3);
      const nftContract = new web3.eth.Contract(
        SimpleNft.abi,
        nftContractAddress
      );

      // console.log(nftContract, "nftc", fromAddress);
      // try {
      //   const owner = await nftContract.methods.ownerOf(tokenId).call();
      //   console.log(`Owner of tokenId ${tokenId} is: ${owner}`);
      // } catch (error) {
      //   console.error(`Token with tokenId ${tokenId} does not exist.`, error);
      // }
      console.log("Contract Address:", nftContract.options.address);
      console.log(MarketContractAddress, tokenId, fromAddress);
      // const code = await web3.eth.getCode(MarketContractAddress);
      // if (code === "0x") {
      //   console.error("MarketContractAddress is not a contract!");
      // } else {
      //   console.log("MarketContractAddress is a valid contract.");
      // }
      // 调用 approve 方法，授权当前账户管理该NFT
      await nftContract.methods
        .approve(MarketContractAddress, tokenId)
        .send({ from: fromAddress });
      console.log(
        `NFT with tokenId ${tokenId} has been approved for address ${fromAddress}`
      );

      // 更新NFT的销售状态
      const updateNftDto = { status };
      await updateNft(id, updateNftDto);
      message.success(`NFT with id ${id} Operation Success`);
      await fetchUserCreatedNfts();
    } catch (error) {
      console.error("Error updating NFT:", error);
      message.error(`Error updating NFT with id ${id}`);
    }
  };
  const fetchUserCreatedNfts = async () => {
    console.log(userInfo);
    if (userInfo?.ownedNfts?.length > 0) {
      try {
        const nftData = await findNftsByIds(userInfo.ownedNfts);
        setNfts(nftData);
      } catch (error) {
        setError("Failed to load NFTs.");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    refreshUserInfo();
    fetchUserCreatedNfts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (nfts.length === 0) return <div>No NFTs found.</div>;

  return (
    <div className="bg-white min-h-[600px] overflow-auto rounded-lg">
      <h1>Your Created NFTs</h1>
      <NftTable
        scene="collected"
        nfts={nfts}
        handleUpdateSaleStatus={handleUpdateSaleStatus}
      />
    </div>
  );
};

export default ProfilePage;
