// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import 'hardhat/console.sol';

import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import {NotOwner, InsufficientTokensInReserve, InsufficientWeiInReserve, MinimumAmountNotReached, TokenFraction, InvalidTokenAmount, TokenAllowanceNotEnough, EthersTransferFailed} from './Errors.sol';

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
        if (msg.sender != owner) revert NotOwner();
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

    function getContractTokenBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function withdrawWei(uint256 amount, address destAddr) public onlyOwner {
        if (amount > weiBalance) revert InsufficientWeiInReserve();

        weiBalance -= amount;

        (bool success, ) = destAddr.call{value: amount}('');
        if (!success) revert EthersTransferFailed();
    }

    function withdrawToken(uint256 amount, address to) public onlyOwner {
        if (amount > getContractTokenBalance()) revert InsufficientTokensInReserve();

        token.safeTransfer(to, amount);
    }

    function _weiToToken(uint256 amount) internal view returns (uint256) {
        return (amount / minimumAmountToExchange);
    }

    function _tokenToWei(uint256 amount) internal view returns (uint256) {
        return (amount * minimumAmountToExchange);
    }

    function _isFractionOfToken(uint256 amount) internal view returns (bool) {
        return (amount % minimumAmountToExchange != 0);
    }

    function buyToken() public payable {
        uint256 amountTobuy = msg.value;
        if (amountTobuy < minimumAmountToExchange) revert MinimumAmountNotReached();
        if (_weiToToken(amountTobuy) > getContractTokenBalance())
            revert InsufficientTokensInReserve();
        if (_isFractionOfToken(amountTobuy)) revert TokenFraction();
        token.safeTransfer(msg.sender, _weiToToken(amountTobuy));
    }

    function sellToken(uint256 amount) public {
        if (amount == 0) revert InvalidTokenAmount();
        uint256 allowance = token.allowance(msg.sender, address(this));
        if (allowance < amount) revert TokenAllowanceNotEnough();
        token.safeTransferFrom(msg.sender, address(this), amount);
        (bool success, ) = msg.sender.call{value: (_tokenToWei(amount))}('');
        if (!success) revert EthersTransferFailed();
    }
}
