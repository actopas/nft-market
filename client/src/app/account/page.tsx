/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-18 02:13:27
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-24 22:04:06
 */
"use client";
import React, { useEffect } from "react";
import { Layout, Avatar, Tabs, Button, Dropdown, Menu } from "antd";
import { useRouter } from "next/navigation";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/account/collected");
  }, [router]);
  return <></>;
};

export default ProfilePage;
