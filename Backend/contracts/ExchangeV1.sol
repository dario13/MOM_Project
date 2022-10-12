// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import 'hardhat/console.sol';

import '@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol';
import {InsufficientTokensInReserve, InsufficientWeiInReserve, MinimumAmountNotReached, TokenFraction, InvalidTokenAmount, TokenAllowanceNotEnough, EthersTransferFailed} from './Errors.sol';
import './Ownership.sol';
import './IExchange.sol';

contract ExchangeV1 is Ownership, IExchange {
    using SafeERC20Upgradeable for IERC20Upgradeable;
    uint256 public minimumAmountToExchange;
    IERC20Upgradeable public token;

    event Bought(address indexed buyer, uint256 amount);
    event Sold(address indexed seller, uint256 amount);
    event Deposit(address indexed depositor, uint256 amount);

    function initialize(address _owner, IERC20Upgradeable _token) public initializer {
        initializeOwnership(_owner);
        token = _token;
        minimumAmountToExchange = 0.0001 ether;
    }

    function owner() public view override returns (address) {
        return Ownership.owner();
    }

    function setMinimumAmountToExchange(uint256 _minimumAmountToExchange)
        external
        override
        onlyOwner
    {
        minimumAmountToExchange = _minimumAmountToExchange;
    }

    function getContractWeiBalance() public view override returns (uint256) {
        return address(this).balance;
    }

    function getContractTokenBalance() public view override returns (uint256) {
        return token.balanceOf(address(this));
    }

    function withdrawWei(uint256 amount, address destAddr) public override onlyOwner {
        if (amount > getContractWeiBalance()) revert InsufficientWeiInReserve();

        (bool success, ) = destAddr.call{value: amount}('');
        if (!success) revert EthersTransferFailed();
    }

    function withdrawToken(uint256 amount, address destAddr) public override onlyOwner {
        if (amount > getContractTokenBalance()) revert InsufficientTokensInReserve();

        token.safeTransfer(destAddr, amount);
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

    function buyToken() public payable override {
        uint256 amountTobuy = msg.value;
        if (amountTobuy < minimumAmountToExchange) revert MinimumAmountNotReached();
        if (_weiToToken(amountTobuy) > getContractTokenBalance())
            revert InsufficientTokensInReserve();
        if (_isFractionOfToken(amountTobuy)) revert TokenFraction();
        token.safeTransfer(msg.sender, _weiToToken(amountTobuy));
        emit Bought(msg.sender, _weiToToken(amountTobuy));
    }

    function sellToken(uint256 amount) public override {
        if (amount == 0) revert InvalidTokenAmount();
        uint256 allowance = token.allowance(msg.sender, address(this));
        if (allowance < amount) revert TokenAllowanceNotEnough();
        token.safeTransferFrom(msg.sender, address(this), amount);
        (bool success, ) = msg.sender.call{value: (_tokenToWei(amount))}('');
        if (!success) revert EthersTransferFailed();
        emit Sold(msg.sender, _tokenToWei(amount));
    }

    function depositWei() external payable override {
        emit Deposit(msg.sender, msg.value);
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }
}
