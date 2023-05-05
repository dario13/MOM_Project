// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol';
import './Ownership.sol';

contract MOMTokenV1 is ERC20Upgradeable, Ownership {
    function initialize(address tokenOwner, uint256 initialSupply) public initializer {
        initializeOwnership(tokenOwner);
        __ERC20_init('MajorOrMinor', 'MOM');
        _mint(tokenOwner, initialSupply);
    }

    function decimals() public pure override returns (uint8) {
        return 0;
    }
}
