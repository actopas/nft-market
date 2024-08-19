/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-19 16:49:31
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-19 17:01:06
 */
"use client";
import React, { useState } from "react";
import { Upload, Button, Form, Input, Modal } from "antd";
import {
  UploadOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

const CreateNFTPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [attributes, setAttributes] = useState<
    { type: string; name: string }[]
  >([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (values: { type: string; name: string }) => {
    setAttributes([...attributes, values]);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <div className="flex items-center mb-6">
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          className="text-white"
          href="/"
        />
        <h1 className="text-3xl ml-2">Create NFT</h1>
      </div>
      <p className="text-gray-400 mb-4">
        Once an item is minted, it cannot be edited.
      </p>

      <div className="flex">
        {/* 左侧上传区域 */}
        <div className="w-1/2 p-4 border border-gray-700 rounded-lg text-white">
          <Upload.Dragger
            name="files"
            action="/upload.do"
            className="bg-black text-white"
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined style={{ fontSize: "48px", color: "#fff" }} />
            </p>
            <p className="ant-upload-text text-white">
              Drag and drop media here
            </p>
            <p className="ant-upload-hint text-white">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
            <p className="text-gray-400 mt-2">
              Max file size: 50MB • JPG, PNG, GIF, SVG, MP4
            </p>
          </Upload.Dragger>
        </div>

        {/* 右侧表单区域 */}
        <div className="w-1/2 ml-8">
          <Form
            layout="vertical"
            className="bg-black text-white"
            onFinish={handleOk}
          >
            <Form.Item
              label={<span className="text-white">Collection</span>}
              required
            >
              <Button className="w-full bg-gray-800 border-none text-white h-12">
                Create New Collection
              </Button>
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Name</span>}
              required
            >
              <Input
                placeholder="Enter NFT name"
                className="bg-gray-800 text-white border-none"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Supply</span>}
              required
            >
              <Input
                placeholder="1"
                type="number"
                className="bg-gray-800 text-white border-none"
              />
            </Form.Item>

            <Form.Item label={<span className="text-white">Description</span>}>
              <TextArea
                placeholder="Enter description"
                rows={4}
                className="bg-gray-800 text-white border-none"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">External Link</span>}
            >
              <Input
                placeholder="https://collection.io/item/123"
                className="bg-gray-800 text-white border-none"
              />
            </Form.Item>

            <Form.Item label={<span className="text-white">Attributes</span>}>
              <div className="text-gray-400 mb-2">
                Attributes describe the traits of the item, they will be
                displayed as part of the collection.
              </div>
              {attributes.length > 0 && (
                <ul className="mb-2">
                  {attributes.map((attr, index) => (
                    <li key={index} className="text-white">
                      {attr.type}: {attr.name}
                    </li>
                  ))}
                </ul>
              )}
              <Button
                type="dashed"
                className="w-full bg-gray-800 border-none text-white h-12 flex items-center justify-center"
                icon={<PlusOutlined />}
                onClick={showModal}
              >
                Add Attribute
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="primary" className="w-full h-12">
                Create
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* 模态框用于添加新特征 */}
      <Modal
        title="Add Attribute"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleOk} className="text-white">
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please input the type!" }]}
          >
            <Input
              placeholder="e.g. Size"
              className="bg-gray-800 text-white border-none"
            />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input
              placeholder="e.g. Large"
              className="bg-gray-800 text-white border-none"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full h-12">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateNFTPage;
