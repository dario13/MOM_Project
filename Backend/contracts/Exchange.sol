// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import 'hardhat/console.sol';

import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

contract Exchange {
    using SafeERC20 for IERC20;
    uint256 public weiBalance;
    address public owner;
    IERC20 public token;

    constructor(address _owner, IERC20 _token) {
        owner = _owner;
        token = _token;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, 'Only owner can perform this operation');
        _;
    }

    function setToken(IERC20 _token) external onlyOwner {
        token = _token;
    }

    function deposit() external payable {
        weiBalance += msg.value;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getWeiBalance() public view returns (uint256) {
        return weiBalance;
    }

    function getTokenBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function getCurrentContractAddress() public view returns (address) {
        return (address(this));
    }

    function withdrawWei(uint256 amount, address payable destAddr) public onlyOwner {
        require(amount < weiBalance, 'Insufficient funds');

        destAddr.transfer(amount);
        weiBalance -= amount;
    }

    function withdrawERC20(uint256 amount, address to) public onlyOwner {
        uint256 erc20balance = token.balanceOf(getCurrentContractAddress());
        require(amount <= erc20balance, 'balance is low');
        token.transfer(to, amount);
    }

    function buy() public payable {
        uint256 amountTobuy = msg.value;
        require(amountTobuy > 0, 'You need to send some ether');
        require(getTokenBalance() >= amountTobuy, 'Not enough tokens in the reserve');
        token.safeTransfer(msg.sender, amountTobuy);
    }

    function sell() public payable {
        uint256 amountToSell = msg.value;
        require(amountToSell > 0, 'You need to send some MOMToken');
        require(amountToSell < getWeiBalance(), 'Not enough wei in the reserve');
        token.safeTransferFrom(msg.sender, getCurrentContractAddress(), amountToSell);
        payable(msg.sender).transfer(amountToSell);
    }
}
