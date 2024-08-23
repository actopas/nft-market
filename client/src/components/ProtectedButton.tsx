"use client";

import React, { ReactNode } from "react";
import { Button, notification } from "antd";
import { ButtonProps } from "antd/lib/button";
import { useAuthGuard } from "../../src/hooks/useAuthGuard";
import { useAuth } from "../../src/context/AuthContext";

interface ProtectedButtonProps extends ButtonProps {
  children: ReactNode;
}

const ProtectedButton: React.FC<ProtectedButtonProps> = ({
  children,
  onClick,
  ...rest
}) => {
  const { isAuthenticated } = useAuthGuard();
  // const { connectWallet } = useAuth();
  const [api, contextHolder] = notification.useNotification();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!isAuthenticated) {
      // 阻止默认的 onClick 行为
      event.preventDefault();
      event.stopPropagation();

      api.warning({
        message: "Action Restricted",
        description: "You need to connect your wallet first.",
      });

      // 如果你想自动尝试连接钱包，可以调用 connectWallet()
      // connectWallet();
    } else {
      // 如果用户已登录，执行传递进来的 onClick 逻辑
      if (onClick) {
        onClick(event);
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Button {...rest} onClick={handleClick}>
        {children}
      </Button>
    </>
  );
};

export default ProtectedButton;
