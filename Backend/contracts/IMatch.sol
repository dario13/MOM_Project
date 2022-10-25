// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface IMatch {
    function bet(bool _higher) external;

    function gameWon() external view returns (bool);

    function gameOver() external view returns (bool);
}
