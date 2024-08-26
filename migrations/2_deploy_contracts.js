/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-26 00:52:57
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-26 22:13:09
 */
const SimpleNFT = artifacts.require("SimpleNFT");
const NFTMarketplace = artifacts.require("NFTMarketplace");
module.exports = function (deployer, network, accounts) {
  const name = "NFTCollection"; // NFT名称
  const symbol = "NFT"; // NFT符号

  deployer.deploy(SimpleNFT, name, symbol);
  deployer.deploy(NFTMarketplace, accounts[0]);
};
