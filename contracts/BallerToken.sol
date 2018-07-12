pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract BallerToken is ERC721Token, Ownable {
  string public constant name = "BallerToken";
  string public constant symbol = "BALL";
  uint256 public constant CREATION_LIMIT = 50000;

  struct Baller {
      string props;
  }

  Baller[] ballers;

  function mint(string _props) public onlyOwner {
      require(totalTokens < CREATION_LIMIT);
      Baller memory _baller = Baller({ props: _props });
      uint256 _ballerId = ballers.push(_baller) - 1;
      _mint(msg.sender, _ballerId);
  }

  function getBaller(uint _ballerId) public view returns(string props) {
      Baller memory _baller = ballers[_ballerId];
      props = _baller.props;
  }
}
