import axios from "axios";
import { Nft } from "./nft.d"; // 假设 Nft 类型已在 nft.types.ts 中定义

// 创建一个 Axios 实例
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/nfts",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 定义 API 方法
export const createNft = async (nft: Nft): Promise<Nft> => {
  try {
    const response = await apiClient.post<Nft>("/", nft);
    return response.data;
  } catch (error) {
    console.error("Failed to create NFT:", error);
    throw error;
  }
};

export const findAllNfts = async (): Promise<Nft[]> => {
  try {
    const response = await apiClient.get<Nft[]>("/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch NFTs:", error);
    throw error;
  }
};

export const findNftById = async (id: string): Promise<Nft> => {
  try {
    const response = await apiClient.get<Nft>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch NFT with id ${id}:`, error);
    throw error;
  }
};

export const updateNft = async (
  id: string,
  nft: Partial<Nft>
): Promise<Nft> => {
  try {
    const response = await apiClient.put<Nft>(`/${id}`, nft);
    return response.data;
  } catch (error) {
    console.error(`Failed to update NFT with id ${id}:`, error);
    throw error;
  }
};

export const deleteNft = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/${id}`);
  } catch (error) {
    console.error(`Failed to delete NFT with id ${id}:`, error);
    throw error;
  }
};

export const getRecommandedNfts = async (): Promise<void> => {
  try {
    await apiClient.get("/recommanded");
  } catch (error) {
    console.error(`Failed to get recommanded nfts`, error);
    throw error;
  }
};

export const getNotableNfts = async (): Promise<void> => {
  try {
    await apiClient.get("/notable");
  } catch (error) {
    console.error(`Failed to get notable nfts`, error);
    throw error;
  }
};
