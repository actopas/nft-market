/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-18 02:01:26
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-23 00:20:12
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "artlogic-res.cloudinary.com",
      "www.cnet.com",
      "i.insider.com",
      "encrypted-tbn0.gstatic.com",
    ],
  },
};

export default nextConfig;
