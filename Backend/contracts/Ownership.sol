// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import {NotOwner} from './Errors.sol';

contract Ownership is OwnableUpgradeable {
    function initializeOwnership(address _owner) public initializer {
        __Ownable_init_unchained();
        transferOwnership(_owner);
    }

    function _checkOwner() internal view override {
        if (owner() != _msgSender()) revert NotOwner();
    }

    function owner() public view virtual override returns (address) {
        return OwnableUpgradeable.owner();
    }
}
