/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-23 22:27:46
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-26 21:47:00
 */
/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-23 22:27:46
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-24 17:41:29
 */
import React from "react";
import { Table, Button, Tag } from "antd";
import { NftSummary } from "@/api/nfts/nft.d";
import { NftStatus } from "@/api/nfts/nft.d";
interface NftTableProps {
  scene: string;
  nfts: NftSummary[];
  handleUpdateSaleStatus: (
    status: NftStatus,
    id: string,
    tokenId: string
  ) => void;
}

const NftTable: React.FC<NftTableProps> = ({
  scene,
  nfts,
  handleUpdateSaleStatus,
}) => {
  const columns = [
    {
      title: "NFT", // NFT 列
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span>{text}</span>,
    },
    ...(scene === "deal"
      ? [
          {
            title: "ID", // NFT 列
            dataIndex: "id",
            key: "id",
            render: (text: string) => <span>{text}</span>,
          },
        ]
      : []),
    {
      title: "Description", // Description 列
      dataIndex: "description",
      key: "description",
      render: (text: string) => <span>{text}</span>,
    },
    ...(scene !== "deal"
      ? [
          {
            title: "Status", // NFT 列
            dataIndex: "status",
            key: "status",
            render: (text: number) => {
              let color = "";
              let statusText = "";
              switch (text) {
                case NftStatus.Hold:
                  color = "green";
                  statusText = "Hold";
                  break;
                case NftStatus.OnSale:
                  color = "red";
                  statusText = "On Sale";
                  break;
                case NftStatus.Sold:
                  color = "gray";
                  statusText = "Sold";
                  break;
                default:
                  color = "default";
                  statusText = "Unknown";
              }
              return <Tag color={color}>{statusText}</Tag>;
            },
          },
        ]
      : []),
    ...(scene === "collected"
      ? [
          {
            title: "Operation",
            key: "operation",
            render: (_: any, record: NftSummary) => {
              if (record.status === 1) {
                return (
                  <Button
                    type="primary"
                    danger
                    className="text-white border-white bg-transparent hover:bg-white hover:text-black"
                    onClick={() =>
                      handleUpdateSaleStatus(
                        NftStatus.Hold,
                        record.id || "",
                        record.tokenId || ""
                      )
                    }
                  >
                    Off shelf
                  </Button>
                );
              } else {
                // 其他情况下，显示 "Sale" 按钮
                return (
                  <Button
                    type="primary"
                    onClick={() =>
                      handleUpdateSaleStatus(
                        NftStatus.OnSale,
                        record.id || "",
                        record.tokenId || ""
                      )
                    } // 调用 handleUpdateSaleStatus 方法
                  >
                    Sale
                  </Button>
                );
              }
            },
          },
        ]
      : []),
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
