"use client";
/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-18 23:01:29
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-23 02:56:18
 */
import React from "react";
import Image from "next/image";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { Nft } from "@/api/nfts/nft.d";
import { useRouter } from "next/navigation";
const { Meta } = Card;

type CardProps = {
  item: Nft;
  key: number;
};
const App: React.FC<CardProps> = ({ item }) => {
  const router = useRouter();

  return (
    <Card
      style={{ width: 300 }}
      className="mb-8 w-[300px] min-w-[300px]"
      cover={
        <Image
          alt="example"
          src={item.imageUrl || ""}
          width={300}
          height={200}
        />
      }
      onClick={() => router.push(`/detail/${item._id}`)}
      actions={
        [
          // <SettingOutlined key="setting" />,
          // <EditOutlined key="edit" />,
          // <EllipsisOutlined key="ellipsis" />,
        ]
      }
    >
      <Meta
        avatar={
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
        }
        title={item.name}
        description={item.description}
      />
    </Card>
  );
};

export default App;
