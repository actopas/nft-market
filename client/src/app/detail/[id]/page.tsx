/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-22 22:42:09
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-25 02:00:19
 */
// app/detail/[id]/page.tsx
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Card, notification } from "antd";
import { useParams } from "next/navigation";
import { findNftById, makeNftOffer } from "@/api/index";
import { Nft } from "@/api/nfts/nft.d";
import ProtectedButton from "@/components/ProtectedButton";
import { useAuth } from "@/context/AuthContext";
export default function NFTDetailPage() {
  const [nft, setNft] = useState<Nft>();
  const [api, contextHolder] = notification.useNotification();
  const { account } = useAuth();
  const params = useParams();

  const handleMakeOffer = async () => {
    const nftId = nft!._id || "";
    const sellerAddress = nft!.owner; // 假设 NFT 对象中有 owner 属性
    const price = nft!.price; // 可以从输入框或其他地方获取价格
    const buyerAddress = account || "";

    await makeNftOffer(nftId, sellerAddress, price, buyerAddress);
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
                onClick={handleMakeOffer}
                disabled={isOwner()}
              >
                Make offer
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
