"use client";
import React, { ReactNode } from "react";
import { Layout, Avatar, Button, Dropdown, Menu } from "antd";
import {
  EditOutlined,
  MoreOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Header, Content } = Layout;

const menu = (
  <Menu>
    <Menu.Item key="1">Option 1</Menu.Item>
    <Menu.Item key="2">Option 2</Menu.Item>
  </Menu>
);

const AccountLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Layout className="bg-black min-h-screen text-white">
      <Header className="bg-black p-4 flex items-center h-[300px]">
        <Avatar size={80} src="" />
        <div className="ml-4">
          <h2 className="text-xl text-white">Unnamed</h2>
          <p className="text-sm text-gray-400">
            0xD13f...9e67 · Joined August 2024
          </p>
        </div>
        <Button
          icon={<ShareAltOutlined />}
          className="ml-auto bg-gray-800 border-none text-white hover:bg-gray-600"
        >
          Share
        </Button>
        <Dropdown overlay={menu} trigger={["click"]} className="ml-2">
          <Button
            icon={<MoreOutlined />}
            className="bg-gray-800 border-none text-white hover:bg-gray-600"
          />
        </Dropdown>
      </Header>
      <Content className="p-6 bg-black text-white">
        <nav className="mb-6">
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/account/collected"
                className="text-white hover:underline"
              >
                Collected
              </Link>
            </li>
            <li>
              <Link
                href="/account/offers"
                className="text-white hover:underline"
              >
                Offers Made
              </Link>
            </li>
            <li>
              <Link
                href="/account/deals"
                className="text-white hover:underline"
              >
                Deals
              </Link>
            </li>
            <li>
              <Link
                href="/account/created"
                className="text-white hover:underline"
              >
                Created
              </Link>
            </li>
            <li>
              <Link href="/activity" className="text-white hover:underline">
                Activity
              </Link>
            </li>
            <li>
              <Link href="/more" className="text-white hover:underline">
                More
              </Link>
            </li>
          </ul>
        </nav>
        {children}
      </Content>
    </Layout>
  );
};

export default AccountLayout;
