"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Web3 from "web3";
import { notification } from "antd";
import { getUserInfo } from "@/api/users/user"; // 假设你有一个获取用户信息的服务

interface AuthContextProps {
  account: string | null;
  userInfo: any | null; // 用户信息状态
  connectWallet: () => Promise<void>;
  disconnectAccount: () => void;
  isConnected: boolean;
  web3: Web3 | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [account, setAccount] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any | null>(null); // 用户信息状态
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const [api, contextHolder] = notification.useNotification();

  const fetchUserInfo = async (address: string) => {
    try {
      const data = await getUserInfo(address);
      setUserInfo(data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          const account = accounts[0];
          setAccount(account);
          setWeb3(web3Instance);
          setIsConnected(true);
          localStorage.setItem("userAddress", account);

          // 仅在没有用户信息时才获取
          if (!userInfo) {
            await fetchUserInfo(account);
          }

          // api.success({
          //   message: "Wallet Connected",
          //   description: `Connected to ${account}`,
          // });
        }
      } catch (error) {
        api.error({
          message: "Connection Failed",
          description: "User denied account access or another error occurred",
        });
        console.error("User denied account access", error);
      }
    } else {
      api.error({
        message: "MetaMask Not Found",
        description: "Please install MetaMask and try again.",
      });
      console.error("MetaMask not found");
    }
  };

  const disconnectAccount = () => {
    setAccount(null);
    setWeb3(null);
    setIsConnected(false);
    setUserInfo(null); // 清空用户信息
    localStorage.removeItem("userAddress");
    // api.info({
    //   message: "Wallet Disconnected",
    //   description: "You have disconnected your wallet.",
    // });
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          const account = accounts[0];
          setAccount(account);
          setIsConnected(true);
          localStorage.setItem("userAddress", account);

          // 获取用户信息
          fetchUserInfo(account);
        } else {
          disconnectAccount();
        }
      });
    }

    const storedAccount = localStorage.getItem("userAddress");
    if (storedAccount) {
      setAccount(storedAccount);
      setIsConnected(true);
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      // 仅在没有用户信息时才获取
      if (!userInfo) {
        fetchUserInfo(storedAccount);
      }
    }
  }, [userInfo]);

  return (
    <AuthContext.Provider
      value={{
        account,
        userInfo, // 提供用户信息
        connectWallet,
        disconnectAccount,
        isConnected,
        web3,
      }}
    >
      {contextHolder} {/* 用于显示通知 */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
