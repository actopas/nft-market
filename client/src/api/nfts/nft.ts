/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-21 20:00:37
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-22 19:25:37
 */
import { Nft } from "./nft.d";
import { apiClient } from "../index";
// 定义 API 方法
export const createNft = async (nft: Nft): Promise<Nft> => {
  try {
    const response = await apiClient.post<Nft>("nfts/", nft);
    return response.data;
  } catch (error) {
    console.error("Failed to create NFT:", error);
    throw error;
  }
};

export const findAllNfts = async (): Promise<Nft[]> => {
  try {
    const response = await apiClient.get<Nft[]>("nfts/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch NFTs:", error);
    throw error;
  }
};

export const findNftById = async (id: string): Promise<Nft> => {
  try {
    const response = await apiClient.get<Nft>(`nfts/${id}`);
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
    const response = await apiClient.put<Nft>(`nfts/${id}`, nft);
    return response.data;
  } catch (error) {
    console.error(`Failed to update NFT with id ${id}:`, error);
    throw error;
  }
};

export const deleteNft = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`nfts/${id}`);
  } catch (error) {
    console.error(`Failed to delete NFT with id ${id}:`, error);
    throw error;
  }
};

export const getRecommandedNfts = async (): Promise<Nft[]> => {
  try {
    const response = await apiClient.get<Nft[]>("nfts/recommanded");
    return response.data;
  } catch (error) {
    console.error("Error fetching recommanded NFTs:", error);
    throw error;
  }
};

export const getNotableNfts = async (): Promise<Nft[]> => {
  try {
    const response = await apiClient.get<Nft[]>("nfts/notable");
    return response.data;
  } catch (error) {
    console.error("Error fetching notable NFTs:", error);
    throw error;
  }
};
