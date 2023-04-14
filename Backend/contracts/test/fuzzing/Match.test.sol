// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

import '../../Match.sol';
import '../../IRandomUtils.sol';

contract MatchTest is Match {
    constructor() Match(address(0x0), 3, IRandomUtils(address(0x0))) {}

    function echidna_hand_test() public view returns (bool) {
        return hand <= cardsToWin;
    }

    function echidna_last_card_test() public view returns (bool) {
        return lastCard >= 0 && lastCard <= 51;
    }
}
