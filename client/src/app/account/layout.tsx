/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-19 15:13:58
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-24 22:16:18
 */
"use client";
import React, { ReactNode } from "react";
import { Layout, Avatar, Button, Dropdown, Menu } from "antd";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { shortenAddress } from "@/utils";

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
  const { account } = useAuth();
  return (
    <Layout className="bg-black min-h-screen text-white">
      <Header className="bg-black p-4 flex items-center h-[200px]">
        <Avatar
          size={64}
          src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
        />
        <div className="ml-4">
          <h2 className="text-xl text-white">
            {shortenAddress(account || "")}
          </h2>
          <p className="text-sm text-gray-400">More Info Coming Soon...</p>
        </div>
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
          </ul>
        </nav>
        {children}
      </Content>
    </Layout>
  );
};

export default AccountLayout;
