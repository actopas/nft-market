/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-20 01:06:06
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-20 01:16:39
 */
import axios from "axios";

// 创建一个 Axios 实例
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001", // 后端的基础 URL
  timeout: 10000, // 请求超时时间
});

// 获取推荐NFT的 API
export const getRecommendNfts = async () => {
  try {
    const response = await apiClient.get("/nfts/recommend");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch recommended NFTs:", error);
    throw error;
  }
};

// 获取热门NFT的 API
export const getHotNfts = async () => {
  try {
    const response = await apiClient.get("/nfts/notable");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch hot NFTs:", error);
    throw error;
  }
};

// 如果需要，还可以封装更多的 API 请求
