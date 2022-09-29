// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract MOMToken is ERC20 {
    address private owner;

    constructor(address tokenOwner, uint256 initialSupply) ERC20('MajorOrMinor', 'MOM') {
        _mint(tokenOwner, initialSupply);
        owner = tokenOwner;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function decimals() public pure override returns (uint8) {
        return 0;
    }
}
