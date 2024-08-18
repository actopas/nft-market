/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-18 15:45:56
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-18 15:57:16
 */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button, Dropdown, notification } from "antd";
import Web3 from "web3";

type NotificationType = "success" | "info" | "warning" | "error";

const Header: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [account, setAccount] = useState<string>("");
  const [api, contextHolder] = notification.useNotification();
  const linkMetaMask = async () => {
    // 检查 MetaMask 是否已安装
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        // 请求用户连接 MetaMask
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        // 保存地址并更新UI
        setAccount(account);
        localStorage.setItem("userAddress", account);
      } catch (error) {
        openNotification("error", "User denied account access", error);
        console.error(error, "User denied account access");
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };
  const shortenAddress = (address: any, length = 4) => {
    if (!address) return "";
    const start = address.substring(0, length + 2); // 加2是因为包括 "0x"
    const end = address.substring(address.length - length);
    return `${start}...${end}`;
  };
  const disconnectAccount = () => {
    setAccount("");
    localStorage.removeItem("userAccount");
  };
  const openNotification = (
    type: NotificationType,
    message: string,
    description: any
  ) => {
    api[type]({
      message,
      description,
    });
  };
  const handleTo = (path: string) => {
    router.push(path);
  };
  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // 或者显示一个加载指示器，防止在未挂载时渲染
  }
  return (
    <div>
      <div className="w-screen h-14 flex justify-between items-center pl-4 pr-4">
        {contextHolder}
        <div className="w-1/3 flex justify-around">
          <span onClick={() => handleTo("/")}>Home</span>
          <span onClick={() => handleTo("/market")}>Market</span>
          <span onClick={() => handleTo("/create")}>Create</span>
          <span onClick={() => handleTo("/mine")}>Mine</span>
        </div>
        {!account ? (
          <Button className="" onClick={linkMetaMask}>
            Connect Wallet
          </Button>
        ) : (
          <div>
            <span>Connect as </span>
            <Dropdown
              overlay={<Button onClick={disconnectAccount}>Disconnect</Button>}
              placement="bottom"
              arrow
            >
              <Button>{shortenAddress(account)}</Button>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
