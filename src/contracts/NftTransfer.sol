pragma solidity 0.5.0;

import "./ERC721Full.sol";

contract NftTransfer is ERC721Full {

    constructor() ERC721Full("PrimeNumber","PRIME") public {
    }


    function transferFrom(address from, address to, uint256 tokenId) public{
        
    }
}