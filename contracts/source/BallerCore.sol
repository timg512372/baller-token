pragma solidity ^0.4.17;

contract Ownable {
  address public owner;

  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

  function Ownable() public {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0));
    OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }
}

library SafeMath {

  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    if (a == 0) {
      return 0;
    }
    uint256 c = a * b;
    assert(c / a == b);
    return c;
  }

  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return c;
  }

  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}

contract ERC721 {
  event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);
  event Approval(address indexed _owner, address indexed _approved, uint256 _tokenId);

  function balanceOf(address _owner) public view returns (uint256 _balance);
  function ownerOf(uint256 _tokenId) public view returns (address _owner);
  function transfer(address _to, uint256 _tokenId) public;
  function approve(address _to, uint256 _tokenId) public;
  function takeOwnership(uint256 _tokenId) public;
}

contract ERC721Token is ERC721 {
  using SafeMath for uint256;

  uint256 private totalTokens;

  mapping (uint256 => address) private tokenOwner;

  mapping (uint256 => address) private tokenApprovals;

  mapping (address => uint256[]) private ownedTokens;

  mapping(uint256 => uint256) private ownedTokensIndex;

  modifier onlyOwnerOf(uint256 _tokenId) {
    require(ownerOf(_tokenId) == msg.sender);
    _;
  }

  function totalSupply() public view returns (uint256) {
    return totalTokens;
  }

  function balanceOf(address _owner) public view returns (uint256) {
    return ownedTokens[_owner].length;
  }

  function tokensOf(address _owner) public view returns (uint256[]) {
    return ownedTokens[_owner];
  }

  function ownerOf(uint256 _tokenId) public view returns (address) {
    address owner = tokenOwner[_tokenId];
    require(owner != address(0));
    return owner;
  }

  function approvedFor(uint256 _tokenId) public view returns (address) {
    return tokenApprovals[_tokenId];
  }

  function transfer(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
    clearApprovalAndTransfer(msg.sender, _to, _tokenId);
  }

  function approve(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
    address owner = ownerOf(_tokenId);
    require(_to != owner);
    if (approvedFor(_tokenId) != 0 || _to != 0) {
      tokenApprovals[_tokenId] = _to;
      Approval(owner, _to, _tokenId);
    }
  }

  function takeOwnership(uint256 _tokenId) public {
    require(isApprovedFor(msg.sender, _tokenId));
    clearApprovalAndTransfer(ownerOf(_tokenId), msg.sender, _tokenId);
  }

  function _mint(address _to, uint256 _tokenId) internal {
    require(_to != address(0));
    addToken(_to, _tokenId);
    Transfer(0x0, _to, _tokenId);
  }

  function _burn(uint256 _tokenId) onlyOwnerOf(_tokenId) internal {
    if (approvedFor(_tokenId) != 0) {
      clearApproval(msg.sender, _tokenId);
    }
    removeToken(msg.sender, _tokenId);
    Transfer(msg.sender, 0x0, _tokenId);
  }

  function isApprovedFor(address _owner, uint256 _tokenId) internal view returns (bool) {
    return approvedFor(_tokenId) == _owner;
  }

  function clearApprovalAndTransfer(address _from, address _to, uint256 _tokenId) internal {
    require(_to != address(0));
    require(_to != ownerOf(_tokenId));
    require(ownerOf(_tokenId) == _from);

    clearApproval(_from, _tokenId);
    removeToken(_from, _tokenId);
    addToken(_to, _tokenId);
    Transfer(_from, _to, _tokenId);
  }

  function clearApproval(address _owner, uint256 _tokenId) private {
    require(ownerOf(_tokenId) == _owner);
    tokenApprovals[_tokenId] = 0;
    Approval(_owner, 0, _tokenId);
  }

  function addToken(address _to, uint256 _tokenId) private {
    require(tokenOwner[_tokenId] == address(0));
    tokenOwner[_tokenId] = _to;
    uint256 length = balanceOf(_to);
    ownedTokens[_to].push(_tokenId);
    ownedTokensIndex[_tokenId] = length;
    totalTokens = totalTokens.add(1);
  }

  function removeToken(address _from, uint256 _tokenId) private {
    require(ownerOf(_tokenId) == _from);

    uint256 tokenIndex = ownedTokensIndex[_tokenId];
    uint256 lastTokenIndex = balanceOf(_from).sub(1);
    uint256 lastToken = ownedTokens[_from][lastTokenIndex];

    tokenOwner[_tokenId] = 0;
    ownedTokens[_from][tokenIndex] = lastToken;
    ownedTokens[_from][lastTokenIndex] = 0;

    ownedTokens[_from].length--;
    ownedTokensIndex[_tokenId] = 0;
    ownedTokensIndex[lastToken] = tokenIndex;
    totalTokens = totalTokens.sub(1);
  }
}

contract BallerToken is ERC721Token, Ownable {
  string public constant name = "BallerToken";
  string public constant symbol = "BALL";

  struct Baller {
      uint256 stats;
  }

  Baller[] ballers;

  function mint(uint256 _stats) public onlyOwner {
      Baller memory _baller = Baller({ stats: _stats });
      uint256 _ballerId = ballers.push(_baller) - 1;
      _mint(msg.sender, _ballerId);
  }

  function getBaller(uint _ballerId) public view returns(uint256 stats) {
      Baller memory _baller = ballers[_ballerId];
      stats = _baller.stats;
  }
}

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
