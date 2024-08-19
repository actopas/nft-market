/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-19 16:47:00
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-19 17:03:33
 */
"use client";
import React from "react";
import { Upload, Button, Form, Input, Card, Col, Row } from "antd";
import { UploadOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const CreateContractPage: React.FC = () => {
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
          <Form layout="vertical" className="bg-black text-white">
            <Form.Item
              label={<span className="text-white">Cover Image</span>}
              required
            >
              <Upload.Dragger
                name="files"
                action="/upload.do"
                className="bg-black text-white"
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
              required
            >
              <Input
                placeholder="Enter your collection name"
                className="bg-gray-800 text-white border-none"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Symbol</span>}
              required
            >
              <Input
                placeholder="MCN"
                className="bg-gray-800 text-white border-none"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Blockchain</span>}
              required
            >
              <Row gutter={16}>
                <Col span={8}>
                  <Card className="bg-gray-800 text-white" bordered={false}>
                    <h3>Ethereum</h3>
                    <p className="text-gray-400">Estimated cost: US$0.96</p>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card className="bg-gray-800 text-white" bordered={false}>
                    <h3>Base</h3>
                    <p className="text-gray-400">Lower cost</p>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card className="bg-gray-800 text-white" bordered={false}>
                    <h3>More Options</h3>
                    <p className="text-gray-400">View more options</p>
                  </Card>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <Button type="primary" className="w-full h-12">
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
