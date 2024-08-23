/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-23 16:54:16
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-23 16:54:25
 */
export const shortenAddress = (address: string, length = 4) => {
  if (!address) return "";
  return `${address.substring(0, length + 2)}...${address.substring(
    address.length - length
  )}`;
};
