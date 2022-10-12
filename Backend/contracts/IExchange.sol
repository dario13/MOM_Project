// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol';

interface IExchange {
    /**
     * @dev Set the minimum amount of wei to exchange for tokens
     */
    function setMinimumAmountToExchange(uint256 _minimumAmountToExchange) external;

    /**
     * @dev Get the contract wei balance
     */
    function getContractWeiBalance() external view returns (uint256);

    /**
     * @dev Get the contract token balance
     */
    function getContractTokenBalance() external view returns (uint256);

    /**
     * @dev Withdraw a wei amount from the contract to a destination address
     */
    function withdrawWei(uint256 amount, address destAddr) external;

    /**
     * @dev Withdraw tokens from the contract
     */
    function withdrawToken(uint256 amount, address destAddr) external;

    /**
     * @dev Exchange wei for tokens
     */
    function buyToken() external payable;

    /**
     * @dev Exchange tokens for wei
     */
    function sellToken(uint256 _amount) external;

    /**
     * @dev Deposit wei to the contract
     */
    function depositWei() external payable;
}
