// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SimpleNFT
 * @dev This contract implements a basic NFT using ERC721 standard with URI storage and ownership control.
 */
contract SimpleNFT is ERC721URIStorage, Ownable {
    event NFTMinted(address recipient, uint256 tokenId);
    uint256 private _tokenIdCounter;
    uint256[] private _allTokens; // 存储所有的 tokenId

    /**
     * @dev Constructor that sets the token name, symbol, and initializes the owner.
     * @param name The name of the NFT token.
     * @param symbol The symbol of the NFT token.
     */
    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) Ownable(msg.sender) {
        _tokenIdCounter = 0;
    }

    /**
     * @notice Mint a new NFT with a specified URI.
     * @param recipient The address that will receive the minted NFT.
     * @param tokenURI The URI pointing to the NFT metadata.
     */
    function mintNFT(
        address recipient,
        string memory tokenURI
    ) external onlyOwner {
        _tokenIdCounter += 1;
        uint256 newTokenId = _tokenIdCounter;

        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        _allTokens.push(newTokenId);
        emit NFTMinted(recipient, newTokenId); // 发出事件，确认铸造
    }
    function getAllTokens() external view returns (uint256[] memory) {
        return _allTokens;
    }
    // 返回已铸造的总数
    function totalSupply() external view returns (uint256) {
        return _allTokens.length;
    }
}
