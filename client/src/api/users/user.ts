import { apiClient } from "../index";

export const getUserInfo = async (walletAddress: string) => {
  try {
    const response = await apiClient.get(`/accounts/${walletAddress}`);
    return response.data; // 返回数据部分
  } catch (error) {
    console.error("Failed to fetch user data", error);
    return null;
  }
};
