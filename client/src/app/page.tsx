import React from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import ItemList from "@/components/ItemList";
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
  return (
    <div>
      <Header />
      <Banner />
      <ItemList title="Recommend NFTs" itemList={recommendList} />
      <ItemList title="Notable NFTs" itemList={hypeList} />
    </div>
  );
};

export default Home;
