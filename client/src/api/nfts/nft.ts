/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-21 20:00:37
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-27 05:38:56
 */
import { Nft, NftSummary } from "./nft.d";
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

export const findNftsByIds = async (ids: string[]): Promise<NftSummary[]> => {
  try {
    const response = await apiClient.get<NftSummary[]>("/nfts/findNftsByIds", {
      params: { ids: ids.join(",") }, // 将 ID 数组转换为逗号分隔的字符串
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    throw error; // 你可以选择抛出错误或处理它
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

export const purchaseNft = async (
  nftId: string,
  sellerAddress: string,
  price: string,
  buyerAddress: string
) => {
  try {
    const response = await apiClient.post("/nfts/purchaseNFT", {
      buyerAddress,
      sellerAddress,
      nftId,
      price,
    });

    if (response.status === 200) {
      console.log("Offer made successfully:", response.data);
    }
  } catch (error) {
    console.error("Failed to make offer:", error);
  }
};
