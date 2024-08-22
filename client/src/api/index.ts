/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-20 01:06:06
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-22 19:15:30
 */
import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
export * from "./nfts/nft";
export * from "./banners/banner";
