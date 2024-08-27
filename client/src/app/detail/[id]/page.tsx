/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-22 22:42:09
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-27 16:04:06
 */
// app/detail/[id]/page.tsx
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Card, notification } from "antd";
import { useParams } from "next/navigation";
import { findNftById, purchaseNft } from "@/api/index";
import { Nft } from "@/api/nfts/nft.d";
import ProtectedButton from "@/components/ProtectedButton";
import { useAuth } from "@/context/AuthContext";
import NftMarketPlace from "@/contract/NFTMarketplace.json";
import SimpleNFT from "@/contract/SimpleNFT.json";

export default function NFTDetailPage() {
  const [nft, setNft] = useState<Nft>();
  const [api, contextHolder] = notification.useNotification();
  const { account, web3 } = useAuth();
  const params = useParams();

  const handlePurchase = async () => {
    const nftId = nft!._id || "";
    const sellerAddress = nft!.owner; // 假设 NFT 对象中有 owner 属性
    const price = nft!.price; // 可以从输入框或其他地方获取价格
    const buyerAddress = account || "";
    const marketContractAddress =
      process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS;
    const nftContractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;
    const priceInWei = web3.utils.toWei(price, "ether");
    const marketContract = new web3.eth.Contract(
      NftMarketPlace.abi,
      marketContractAddress
    );
    const nftContract = new web3.eth.Contract(
      SimpleNFT.abi,
      nftContractAddress
    );
    console.log(
      "check",
      nftContract,
      nftContractAddress,
      nft.tokenId,
      sellerAddress,
      priceInWei
    );
    const currentOwner = await nftContract.methods.ownerOf(nft.tokenId).call();
    const formattedSellerAddress = web3.utils.toChecksumAddress(sellerAddress);
    console.log(currentOwner, sellerAddress, formattedSellerAddress);
    if (currentOwner !== formattedSellerAddress) {
      throw new Error("Seller does not own the NFT");
    }
    const transaction = await marketContract.methods
      .buyNFT(nftContractAddress, nft.tokenId, sellerAddress, priceInWei)
      .send({
        from: account,
        value: priceInWei,
      });
    await purchaseNft(nftId, sellerAddress, price, buyerAddress);
    api.success({
      message: "transaction successfully",
      description: "Please back to home",
    });
  };
  const isOwner = () => {
    return nft!.owner === account;
  };
  useEffect(() => {
    if (params.id) {
      const fetchNftById = async () => {
        try {
          const nftDetails = await findNftById(params.id);
          setNft(nftDetails);
          console.log(nftDetails, "nft");
        } catch (error) {
          console.error("Failed to load NFT details:", error);
        }
      };
      fetchNftById();
    }
  }, []);
  if (!nft) return <p>Loading...</p>;
  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      {contextHolder}
      <div className="flex w-4/5 max-w-7xl">
        {/* Image container */}
        <div className="w-1/2 p-4">
          <Image
            src={nft.imageUrl || "/placeholder.png"}
            alt={nft.name}
            width={900}
            height={500}
            layout="responsive"
          />
        </div>
        {/* Details container */}
        <div className="w-1/2 p-4">
          <Card
            className="bg-gray-800 border-gray-700"
            actions={[
              <ProtectedButton
                key="offer"
                type="primary"
                onClick={handlePurchase}
                disabled={isOwner()}
              >
                Purchase
              </ProtectedButton>,
            ]}
          >
            <Card.Meta
              title={<span className="text-white">{nft.name}</span>} // 修改标题颜色
              description={
                <div className="text-white">
                  {" "}
                  {/* 修改描述部分的颜色 */}
                  <p>Artist: {nft.artist}</p>
                  <p>Price: {nft.price}</p>
                  <p>{nft.description}</p>
                  {nft.properties && (
                    <>
                      <p>Rarity: {nft.properties.rarity}</p>
                      <p>Attributes: {nft.properties.attributes.join(", ")}</p>
                    </>
                  )}
                </div>
              }
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
