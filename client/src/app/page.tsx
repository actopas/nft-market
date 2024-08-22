/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-18 02:09:04
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-22 19:16:35
 */
"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import ItemList from "@/components/ItemList";
import { getRecommandedNfts, getNotableNfts, getAllBanners } from "@/api/index";
import "./globals.css";
import "antd/dist/reset.css";
import { Nft } from "@/api/nfts/nft.d";
const Banner = dynamic(() => import("@/components/Banner"), { ssr: false });
const Card = dynamic(() => import("@/components/Card"), { ssr: false });
const Home: React.FC = () => {
  const [recommendNfts, setRecommendNfts] = useState<Nft[]>([]);
  const [notableNfts, setNotableNfts] = useState<Nft[]>([]);
  const [banners, setBanners] = useState<string[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const response = await fetch("http://localhost:3001/banners/list");
      const data = await response.json();
      setBanners(data); // 假设返回的数据是一个图片 URL 数组
    };

    fetchBanners();
  }, []);
  useEffect(() => {
    getAllBanners()
      .then((data) => setBanners(data))
      .catch((error) => console.error("Error fetching banners:", error));
    // 获取推荐NFT
    getRecommandedNfts()
      .then((data) => setRecommendNfts(data))
      .catch((error) =>
        console.error("Error fetching recommended NFTs:", error)
      );

    // 获取热门NFT
    getNotableNfts()
      .then((data) => setNotableNfts(data))
      .catch((error) => console.error("Error fetching notable NFTs:", error));
  }, []);
  return (
    <div>
      <Banner banners={banners} />
      <ItemList title="Recommend NFTs" itemList={recommendNfts} />
      <ItemList title="Notable NFTs" itemList={notableNfts} />
    </div>
  );
};

export default Home;
