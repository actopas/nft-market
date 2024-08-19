/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-18 02:09:04
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-20 01:36:40
 */
"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import ItemList from "@/components/ItemList";
import { getRecommendNfts, getHotNfts } from "../api";
import "./globals.css";
import "antd/dist/reset.css"; // Ant Design 的重置样式
const Banner = dynamic(() => import("@/components/Banner"), { ssr: false });
const Card = dynamic(() => import("@/components/Card"), { ssr: false });
const recommendList = [
  { title: "123", desc: "good" },
  { title: "123", desc: "good" },
  { title: "123", desc: "good" },
  { title: "123", desc: "good" },
  { title: "123", desc: "good" },
  { title: "123", desc: "good" },
  { title: "123", desc: "good" },
];
const hypeList = [
  { title: "123", desc: "good" },
  { title: "123", desc: "good" },
  { title: "123", desc: "good" },
  { title: "123", desc: "good" },
  { title: "123", desc: "good" },
  { title: "123", desc: "good" },
  { title: "123", desc: "good" },
];
const Home: React.FC = () => {
  const [recommendNfts, setRecommendNfts] = useState([]);
  const [hotNfts, setHotNfts] = useState([]);

  useEffect(() => {
    // 获取推荐NFT
    getRecommendNfts()
      .then((data) => setRecommendNfts(data))
      .catch((error) =>
        console.error("Error fetching recommended NFTs:", error)
      );

    // 获取热门NFT
    getHotNfts()
      .then((data) => setHotNfts(data))
      .catch((error) => console.error("Error fetching hot NFTs:", error));
  }, []);
  return (
    <div>
      <Banner />
      <ItemList title="Recommend NFTs" itemList={recommendList} />
      <ItemList title="Notable NFTs" itemList={hypeList} />
    </div>
  );
};

export default Home;
