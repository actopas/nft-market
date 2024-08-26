// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketplace is Ownable {
    struct Listing {
        uint256 price;
        address seller;
    }
    // NFT合约地址 => Token ID => Listing信息
    mapping(address => mapping(uint256 => Listing)) public listings;

    event NFTListed(
        address indexed nftContract,
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price
    );
    event NFTSold(
        address indexed nftContract,
        uint256 indexed tokenId,
        address indexed buyer,
        uint256 price
    );
    event NFTListingCanceled(
        address indexed nftContract,
        uint256 indexed tokenId,
        address indexed seller
    );
    constructor(address initialOwner) Ownable(initialOwner) {
        // 初始化一些状态
    }
    // 将NFT上架到市场
    function listNFT(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external {
        require(price > 0, "Price must be greater than zero");
        IERC721 nft = IERC721(nftContract);
        require(
            nft.ownerOf(tokenId) == msg.sender,
            "Only the owner can list the NFT"
        );
        require(
            nft.getApproved(tokenId) == address(this),
            "Marketplace must be approved to transfer this NFT"
        );

        listings[nftContract][tokenId] = Listing(price, msg.sender);

        emit NFTListed(nftContract, tokenId, msg.sender, price);
    }

    // 购买NFT
    function buyNFT(address nftContract, uint256 tokenId) external payable {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.price > 0, "NFT is not for sale");
        require(msg.value == listing.price, "Incorrect payment amount");

        // 转移NFT给买家
        IERC721(nftContract).safeTransferFrom(
            listing.seller,
            msg.sender,
            tokenId
        );

        // 转移支付款给卖家
        payable(listing.seller).transfer(msg.value);

        // 清除Listing
        delete listings[nftContract][tokenId];

        emit NFTSold(nftContract, tokenId, msg.sender, listing.price);
    }

    // 取消上架的NFT
    function cancelListing(address nftContract, uint256 tokenId) external {
        Listing memory listing = listings[nftContract][tokenId];
        require(
            listing.seller == msg.sender,
            "Only the seller can cancel the listing"
        );

        delete listings[nftContract][tokenId];

        emit NFTListingCanceled(nftContract, tokenId, msg.sender);
    }
}
