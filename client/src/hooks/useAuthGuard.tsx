/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-23 13:08:43
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-23 13:08:51
 */
import { useAuth } from "../context/AuthContext";

export const useAuthGuard = () => {
  const { account } = useAuth();

  const isAuthenticated = !!account;

  return { isAuthenticated };
};
