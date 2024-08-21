"use client";
import React, { useState } from "react";
import { Upload, Button, Form, Input, Card, Col, Row, message } from "antd";
import { UploadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { createNft } from "@/api/index";
const { TextArea } = Input;

const CreateContractPage: React.FC = () => {
  const [selectedBlockchain, setSelectedBlockchain] = useState<string>("");

  async function submitCreateNftRequest() {
    try {
      // 构建新的 NFT 数据
      const newNft = {
        name: "Example NFT",
        artist: "Artist Name",
        price: "10",
        owner: "0xOwnerAddressHere",
        imageUrl: "https://example.com/image.png",
        description: "This is an example NFT.",
        properties: {
          rarity: "Rare",
          attributes: ["Attribute1", "Attribute2"],
        },
        onSale: true,
      };

      // 向后端发送创建 NFT 的请求
      const createdNft = await createNft(newNft);
      console.log("NFT created successfully:", createdNft);

      // 处理后续逻辑，例如通知用户或更新界面
    } catch (error) {
      console.error("Error creating NFT:", error);
    }
  }
  return (
    <div className="bg-black min-h-screen text-white p-6">
      <div className="flex items-center mb-6">
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          className="text-white"
          href="/"
        />
        <h1 className="text-3xl ml-2">Create Contract</h1>
      </div>
      <p className="text-gray-400 mb-4">
        Let us set up a smart contract for your release.
      </p>
      <p className="text-gray-400 mb-6">
        You need to deploy an ERC-721 contract on the blockchain before
        releasing your items.
        <a href="#" className="text-blue-500">
          {" "}
          What is a contract?
        </a>
      </p>

      <Row gutter={24}>
        <Col span={16}>
          <Form
            layout="vertical"
            className="bg-black text-white"
            onFinish={submitCreateNftRequest}
          >
            <Form.Item
              label={<span className="text-white">Cover Image</span>}
              required
            >
              <Upload.Dragger
                name="coverImage"
                action="/uploadCoverImage" // 后端API用于处理图片上传
                className="bg-black text-white"
                onChange={(info) => {
                  if (info.file.status === "done") {
                    console.log("File uploaded:", info.file.response);
                    // 处理上传后的响应，例如将图片URL存储到表单中
                  }
                }}
              >
                <p className="ant-upload-drag-icon">
                  <UploadOutlined style={{ fontSize: "32px", color: "#fff" }} />
                </p>
                <p className="ant-upload-text">Drag or click to upload</p>
                <p className="ant-upload-hint">JPG, PNG, SVG or GIF</p>
                <p className="text-gray-400 mt-2">Max size: 350x350 pixels</p>
              </Upload.Dragger>
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Contract Name</span>}
              name="contractName"
              rules={[
                { required: true, message: "Please enter contract name" },
              ]}
            >
              <Input
                placeholder="Enter your collection name"
                className="bg-gray-800 text-white border-none"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Symbol</span>}
              name="symbol"
              rules={[{ required: true, message: "Please enter a symbol" }]}
            >
              <Input
                placeholder="MCN"
                className="bg-gray-800 text-white border-none"
              />
            </Form.Item>

            {/* 新增字段：艺术家名称 */}
            <Form.Item
              label={<span className="text-white">Artist Name</span>}
              name="artist"
              rules={[{ required: true, message: "Please enter artist name" }]}
            >
              <Input
                placeholder="Enter the artist's name"
                className="bg-gray-800 text-white border-none"
              />
            </Form.Item>

            {/* 新增字段：价格 */}
            <Form.Item
              label={<span className="text-white">Price (in ETH)</span>}
              name="price"
              rules={[{ required: true, message: "Please enter the price" }]}
            >
              <Input
                placeholder="Enter the price in ETH"
                className="bg-gray-800 text-white border-none"
                type="number"
              />
            </Form.Item>

            {/* 新增字段：描述 */}
            <Form.Item
              label={<span className="text-white">Description</span>}
              name="description"
              rules={[
                { required: true, message: "Please enter a description" },
              ]}
            >
              <TextArea
                placeholder="Describe your NFT"
                className="bg-gray-800 text-white border-none"
                rows={4}
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Blockchain</span>}
              required
            >
              <Row gutter={16}>
                <Col span={8}>
                  <Card
                    className={`bg-gray-800 text-white border-2 ${
                      selectedBlockchain === "Ethereum" ? "border-blue-500" : ""
                    }`}
                    bordered={false}
                    onClick={() => setSelectedBlockchain("Ethereum")}
                  >
                    <h3>Ethereum</h3>
                    <p className="text-gray-400">Estimated cost: US$0.96</p>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    className={`bg-gray-800 text-white  border-2 ${
                      selectedBlockchain === "Base" ? "border-blue-500" : ""
                    }`}
                    bordered={false}
                    onClick={() => setSelectedBlockchain("Base")}
                  >
                    <h3>Base</h3>
                    <p className="text-gray-400">Lower cost</p>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    className="bg-gray-800 text-white"
                    bordered={false}
                    onClick={() => setSelectedBlockchain("More Options")}
                  >
                    <h3>More Options</h3>
                    <p className="text-gray-400">View more options</p>
                  </Card>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-12"
                disabled={!selectedBlockchain}
              >
                Continue
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={8}>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-white">
              After deploying the contract, you will be able to:
            </h3>
            <ul className="text-gray-400 mt-4 space-y-2">
              <li>Manage collection settings</li>
              <li>Edit item details</li>
              <li>Release items in phases</li>
              <li>Set up pricing plans</li>
              <li>Deploy smart contracts</li>
              <li>And more...</li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CreateContractPage;
