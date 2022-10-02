// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import 'hardhat/console.sol';

import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

contract Exchange {
    using SafeERC20 for IERC20;
    uint256 public weiBalance;
    uint256 public minimumAmountToExchange;
    address public owner;
    IERC20 public token;

    event Bought(address buyer, uint256 amount);

    constructor(address _owner, IERC20 _token) {
        owner = _owner;
        token = _token;
        minimumAmountToExchange = 0.0001 ether;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, 'Only owner can perform this operation');
        _;
    }

    function setMinimumAmountToExchange(uint256 _minimumAmountToExchange) external onlyOwner {
        minimumAmountToExchange = _minimumAmountToExchange;
    }

    function setToken(IERC20 _token) external onlyOwner {
        token = _token;
    }

    function depositWei() external payable {
        weiBalance += msg.value;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getWeiBalance() public view returns (uint256) {
        return weiBalance;
    }

    function getContractTokenBalance() public view returns (uint256) {
        return token.balanceOf(getCurrentContractAddress());
    }

    function getCurrentContractAddress() public view returns (address) {
        return (address(this));
    }

    function withdrawWei(uint256 amount, address payable destAddr) public onlyOwner {
        require(amount < weiBalance, 'Insufficient funds');

        destAddr.transfer(amount);
        weiBalance -= amount;
    }

    function withdrawToken(uint256 amount, address to) public onlyOwner {
        require(amount <= getContractTokenBalance(), 'Insufficient funds');
        token.safeTransfer(to, amount);
    }

    function _weiToToken(uint256 amount) internal view returns (uint256) {
        return (amount / minimumAmountToExchange);
    }

    function _tokenToWei(uint256 amount) internal view returns (uint256) {
        return (amount * minimumAmountToExchange);
    }

    function _isNotFractionOfToken(uint256 amount) internal view returns (bool) {
        return (amount % minimumAmountToExchange == 0);
    }

    function buyToken() public payable {
        uint256 amountTobuy = msg.value;
        require(amountTobuy >= minimumAmountToExchange, 'The minimum amount to buy is not enough');
        require(
            _weiToToken(amountTobuy) <= getContractTokenBalance(),
            'Not enough tokens in the reserve'
        );
        require(_isNotFractionOfToken(amountTobuy), 'Only whole tokens can be bought');
        token.safeTransfer(msg.sender, _weiToToken(amountTobuy));
    }

    function sellToken(uint256 amount) public {
        require(amount > 0, "The amount of tokens to sell couldn't be 0");
        uint256 allowance = token.allowance(msg.sender, getCurrentContractAddress());
        require(allowance >= amount, 'The token allowance is not enough');
        token.safeTransferFrom(msg.sender, getCurrentContractAddress(), amount);
        (bool success, ) = msg.sender.call{value: (_tokenToWei(amount))}('');
        require(success, 'Failed to send Ether');
    }
}
