/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-23 22:27:46
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-23 22:31:31
 */
import React from "react";
import { Table, Button } from "antd";
import { NftSummary } from "@/api/nfts/nft.d";

interface NftTableProps {
  nfts: NftSummary[];
  handleSoldOut: (id: string) => void;
}

const NftTable: React.FC<NftTableProps> = ({ nfts, handleSoldOut }) => {
  const columns = [
    {
      title: "NFT", // NFT 列
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Description", // Description 列
      dataIndex: "description",
      key: "description",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Operation", // Operation 列
      key: "operation",
      render: (_: any, record: NftSummary) => (
        <Button
          type="primary"
          danger
          className="text-white border-white bg-transparent hover:bg-white hover:text-black"
          onClick={() => handleSoldOut(record._id || "")}
        >
          Sold Out
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={nfts}
      rowKey="id"
      className="bg-transparent" // 设置表格背景为透明
      pagination={false} // 如果不需要分页，可以禁用
    />
  );
};

export default NftTable;
