"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button, Dropdown, notification, MenuProps } from "antd";
import { useAuth } from "@/context/AuthContext"; // 确保路径正确
import { useAuthGuard } from "@/hooks/useAuthGuard"; // 确保路径正确
import { shortenAddress } from "@/utils";

interface Props {
  account: string;
  items: MenuProps["items"];
}

const Header: React.FC = () => {
  const { account, connectWallet, disconnectAccount } = useAuth();
  const { isAuthenticated } = useAuthGuard();
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

  const openNotification = (
    type: "success" | "info" | "warning" | "error",
    message: string,
    description: any
  ) => {
    api[type]({
      message,
      description,
    });
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // 如果当前路由是 /account，则禁用 Dropdown

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      openNotification("error", "Connection Failed", error.message);
    }
  };
  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: "Profile",
      onClick: () => handleNavigation("/account"),
    },
    {
      key: "disconnect",
      label: "Disconnect",
      onClick: disconnectAccount,
    },
  ];
  const AccountDropdown = ({ account, items }: Props) => {
    const pathname = usePathname();
    const isAccountPage = pathname === "/account";

    return isAccountPage ? (
      <Button>{shortenAddress(account || "")}</Button>
    ) : (
      <Dropdown menu={{ items }} placement="bottom" arrow>
        <Button>{shortenAddress(account || "")}</Button>
      </Dropdown>
    );
  };
  return (
    <div className="h-14 flex justify-between items-center pl-4 pr-4">
      {contextHolder}
      <div className="w-1/3 flex justify-around">
        <span className="cursor-pointer" onClick={() => handleNavigation("/")}>
          Home
        </span>
        <span
          className="cursor-pointer"
          onClick={() => handleNavigation("/establish")}
        >
          Establish
        </span>
      </div>
      {!isAuthenticated ? (
        <Button onClick={handleConnect}>Connect Wallet</Button>
      ) : (
        <div>
          <span>Connected as </span>
          <AccountDropdown account={account || ""} items={items} />
        </div>
      )}
    </div>
  );
};

export default Header;
