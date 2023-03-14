// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

enum BetOptions {
    Higher,
    Lower
}

interface IMatch {
    function bet(BetOptions betOption) external;

    function gameWon() external view returns (bool);

    function gameOver() external view returns (bool);
}
