// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SimpleNFT
 * @dev This contract implements a basic NFT using ERC721 standard with URI storage and ownership control.
 */
contract SimpleNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    /**
     * @dev Constructor that gives the contract owner all tokens and sets the token name and symbol.
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
    }
}
