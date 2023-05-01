// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

import {IRandomUtils} from './IRandomUtils.sol';

contract RandomUtils is IRandomUtils {
    function getRandomValue() public view override returns (uint8) {
        uint256 randomValue = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))
        );
        return uint8(randomValue);
    }
}
