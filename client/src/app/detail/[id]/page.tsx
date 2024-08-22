/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-22 22:42:09
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-23 03:09:54
 */
// app/detail/[id]/page.tsx
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Button, Card } from "antd";
import { useParams } from "next/navigation";
import { findNftById } from "@/api/index";
import { Nft } from "@/api/nfts/nft.d";
export default function NFTDetailPage() {
  const [nft, setNft] = useState<Nft>();
  const params = useParams();
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
              <Button key="offer" type="primary">
                Make offer
              </Button>,
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
