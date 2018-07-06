pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

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
