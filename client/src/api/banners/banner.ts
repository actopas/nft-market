/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-22 18:28:24
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-22 19:16:19
 */
import { apiClient } from "../index";
export const getAllBanners = async (): Promise<string[]> => {
  try {
    const response = await apiClient.get<string[]>("/banners/list");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch banners:", error);
    throw error;
  }
};
