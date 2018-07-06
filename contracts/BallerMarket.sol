pragma solidity ^0.4.17;

import "zeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract BallerMarket {
  ERC721 public nonFungibleContract;

  struct Market {
      address seller;
      uint256 price;
  }

  mapping (uint256 => Market) public tokenIdToMarket;

  function BallerMarket(address _nftAddress) public {
    nonFungibleContract = ERC721(_nftAddress);
  }

  function createMarket(uint256 _tokenId, uint256 _price) public {
      nonFungibleContract.takeOwnership(_tokenId);
      Market memory _market = Market({ seller: msg.sender, price: uint256(_price) });
      tokenIdToMarket[_tokenId] = _market;
  }

  function bid(uint256 _tokenId) public payable {
      Market memory market = tokenIdToMarket[_tokenId];
      require(market.seller != address(0));
      require(msg.value >= market.price);

      address seller = market.seller;
      uint256 price = market.price;

      delete tokenIdToMarket[_tokenId];
      seller.transfer(price);
      nonFungibleContract.transfer(msg.sender, _tokenId);
  }

  function cancel(uint256 _tokenId) public {
      Market memory market = tokenIdToMarket[_tokenId];
      require(market.seller == msg.sender);

      delete tokenIdToMarket[_tokenId];
      nonFungibleContract.transfer(msg.sender, _tokenId);
  }
}
