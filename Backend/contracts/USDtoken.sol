// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

/**
 * @title An ERC20 contract for USD tokens. Only used for testing.
 * @author @dario13
 * @notice This contract creates a USD token.
 */
contract USDtoken is ERC20 {
    constructor() ERC20('USDtoken', 'USDT') {
        _mint(msg.sender, 10 ** 18);
    }

    function decimals() public pure override returns (uint8) {
        return 0;
    }
}
