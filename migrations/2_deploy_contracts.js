/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-26 00:52:57
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-26 01:01:35
 */
const SimpleNFT = artifacts.require("SimpleNFT");

module.exports = function (deployer) {
  const name = "NFTCollection"; // NFT名称
  const symbol = "NFT"; // NFT符号

  deployer.deploy(SimpleNFT, name, symbol);
};
