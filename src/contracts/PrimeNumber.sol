pragma solidity 0.5.0;

import "./ERC721Full.sol";
import "./Integers.sol";

contract PrimeNumber is ERC721Full {

    string[] public primeNumbersNft;
    mapping(string => bool) _nftExists;

    constructor() ERC721Full("PrimeNumber","PRIME") public {
    }

    function mint(string memory _prime) public {
        require(checkPrime(_prime));
        require(!_nftExists[_prime]);
        uint _id = primeNumbersNft.push(_prime);
        _mint(msg.sender, _id);
        _nftExists[_prime] = true;
    }

    function checkPrime(string memory _numberStr) internal pure returns(bool) {
      
        uint _j=0;
        uint _number =  Integers.parseInt(_numberStr);
        for (_j = 2; _j <= _number/2; _j++ ) {  
            if (_number% _j == 0) {   
                 return false;
            }        
        }
        return _number > 1;
   }

}