// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarketplace {
    event NFTSold(
        address indexed nftContract,
        uint256 indexed tokenId,
        address buyer,
        uint256 price
    );

    function buyNFT(
        address nftContract,
        uint256 tokenId,
        address seller,
        uint256 price
    ) external payable {
        require(price > 0, "Price must be greater than zero");
        require(msg.value == price, "Incorrect payment amount");

        IERC721 nft = IERC721(nftContract);

        // 转移NFT给买家
        nft.safeTransferFrom(seller, msg.sender, tokenId);

        // 转移支付款给卖家
        payable(seller).transfer(msg.value);

        emit NFTSold(nftContract, tokenId, msg.sender, price);
    }
}
