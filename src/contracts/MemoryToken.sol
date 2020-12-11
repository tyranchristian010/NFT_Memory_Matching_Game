pragma solidity 0.5.0;

import "./ERC721Full.sol";

contract MemoryToken is ERC721Full {
  constructor() ERC721Full("Memory Token", "MMRY") public {

  }
  function mint(address to, string memory tokenURI) public returns(bool) { 
    uint _tokenId=totalSupply().add(1);  //we create the updated _tokenId to use the _mint(). The ERC721 standard has a totalSupply() that returns the number of tokens that already exists. The allTokens[] keeps track of all the tokens.and we just read the length of the array to get the totalSupply which we will use as the tokenID      
    _mint(to, _tokenId);               //use the ERC721 mint() to send the token to the to addres and you can usew the amount or the tokenId as long as there is an integer in this spot.
    _setTokenURI(_tokenId, tokenURI);   //set the tokenURI the ERC721 has a _setTokenURI()
    return true;
    }

   


}