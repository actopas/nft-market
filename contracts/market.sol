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

        // 检查卖家是否确实是该NFT的所有者
        IERC721 nft = IERC721(nftContract);
        require(
            nft.ownerOf(tokenId) == address(seller),
            "Seller does not own the NFT"
        );

        // 转移NFT给买家
        nft.safeTransferFrom(seller, msg.sender, tokenId);

        // 转移支付款给卖家
        payable(seller).transfer(msg.value);

        emit NFTSold(nftContract, tokenId, msg.sender, price);
    }
}
