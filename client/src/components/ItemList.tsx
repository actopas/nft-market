"use client";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Card = dynamic(() => import("@/components/Card"), { ssr: false });

type Item = {
  title: string;
  desc: string;
};

type ItemListProps = {
  title: string;
  itemList: Item[];
};

const ItemList: React.FC<ItemListProps> = ({ title, itemList }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="">
      <div className="text-4xl mt-8 mb-8 ml-12">{title}</div>
      <div className="flex items-center relative">
        <Button
          className="bg-gray-800 border-none text-white h-12 w-12 rounded-full flex items-center justify-center cursor-pointer mx-2 hover:bg-gray-600"
          onClick={scrollLeft}
          icon={<LeftOutlined />}
        />
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 scroll-smooth flex-1 no-scrollbar"
        >
          {itemList.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
        <Button
          className="bg-gray-800 border-none text-white h-12 w-12 rounded-full flex items-center justify-center cursor-pointer mx-2 hover:bg-gray-600"
          onClick={scrollRight}
          icon={<RightOutlined />}
        />
      </div>
    </div>
  );
};

export default ItemList;
