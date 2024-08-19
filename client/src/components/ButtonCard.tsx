/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-19 01:04:16
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-19 18:02:27
 */
"use client";
import React from "react";
import { Card } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
type ItemProps = {
  item: {
    title: string;
    path: string;
    content: string;
  };
};
const ButtonCard: React.FC<ItemProps> = ({ item }) => {
  const router = useRouter();
  return (
    <Card
      hoverable
      className="mt-[30px] text-white"
      title={<span className="text-white">{item.title}</span>}
      bordered={false}
      style={{
        width: 500,
        boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 16px",
        backgroundColor: "rgb(32, 32, 32)",
      }}
      styles={{
        header: {
          borderBottom: "1px solid #505050", // 设置为灰色边框
        },
      }}
      onClick={() => router.push(item.path)}
    >
      <div className="flex justify-between h-[100px] ">
        <div>{item.content}</div>
        <div className="flex justify-center items-center">
          <RightOutlined />
        </div>
      </div>
    </Card>
  );
};

export default ButtonCard;
