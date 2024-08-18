"use client";
/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-18 23:01:29
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-18 23:58:20
 */
import React from "react";
import Image from "next/image";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";

const { Meta } = Card;
type Item = {
  title: string;
  desc: string;
};
type CardProps = {
  item: Item;
  key: number;
};
const App: React.FC<CardProps> = ({ item }) => (
  <Card
    style={{ width: 300 }}
    className="mb-8 w-[300px] min-w-[300px]"
    cover={<Image alt="example" src="" width={300} height={200} />}
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
      title={item.title}
      description={item.desc}
    />
  </Card>
);

export default App;
