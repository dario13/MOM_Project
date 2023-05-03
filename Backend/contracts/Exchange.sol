// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/utils/Address.sol';
import {MaxStableCoinAmountTooLow, MinStableCoinAmountTooHigh} from './Errors.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

/**
 * @title An exchange for MOM tokens.
 * @notice This contract allows users to buy and sell MOM tokens using a stablecoin.
 */
contract Exchange {
    using SafeMath for uint256;
    using Address for address;
    using SafeERC20 for IERC20;

    IERC20 public mom;
    IERC20 public stableCoin;

    uint256 public constant FEE_DIVISOR = 1000; // 0.1% fee
    uint256 public constant FEE_RATE = 1;

    event TokenPurchase(address indexed buyer, uint256 amount, uint256 stableCoinAmount);
    event TokenSale(address indexed seller, uint256 amount, uint256 stableCoinAmount);

    /**
     * @dev Initializes the contract with the MOM contract and the ERC20 stablecoin.
     * @param _mom Address of the mom contract.
     * @param _stableCoin Address of the ERC20 stablecoin contract.
     */
    constructor(IERC20 _mom, IERC20 _stableCoin) {
        mom = _mom;
        stableCoin = _stableCoin;
    }

    /**
     * @notice Buys MOM tokens using the stablecoin.
     * @dev Transfers stablecoin from the buyer to the contract, then transfers the requested tokens to the buyer.
     * @param tokenAmount The amount of tokens to buy.
     * @param maxStableCoinAmount The maximum amount of stablecoin the buyer is willing to pay.
     */
    function buyTokens(uint256 tokenAmount, uint256 maxStableCoinAmount) external {
        uint256 stableCoinAmount = getStableCoinAmountIn(tokenAmount);
        if (stableCoinAmount > maxStableCoinAmount) revert MaxStableCoinAmountTooLow();

        stableCoin.safeTransferFrom(msg.sender, address(this), stableCoinAmount);
        mom.safeTransfer(msg.sender, tokenAmount);

        emit TokenPurchase(msg.sender, tokenAmount, stableCoinAmount);
    }

    /**
     * @notice Sells MOM tokens for the stablecoin.
     * @dev Transfers tokens from the seller to the contract, then transfers the stablecoin to the seller.
     * @param tokenAmount The amount of tokens to sell.
     * @param minStableCoinAmount The minimum amount of stablecoin the seller is willing to accept.
     */
    function sellTokens(uint256 tokenAmount, uint256 minStableCoinAmount) external {
        uint256 stableCoinAmount = getStableCoinAmountOut(tokenAmount);
        if (stableCoinAmount < minStableCoinAmount) revert MinStableCoinAmountTooHigh();

        mom.safeTransferFrom(msg.sender, address(this), tokenAmount);
        stableCoin.safeTransfer(msg.sender, stableCoinAmount);

        emit TokenSale(msg.sender, tokenAmount, stableCoinAmount);
    }

    /**
     * @notice Calculates the amount of stablecoin needed to buy the given amount of tokens.
     * @dev Uses the constant product formula to determine the required amount of stablecoin.
     * @param tokenAmount The amount of tokens to buy.
     * @return The amount of stablecoin required.
     */
    function getStableCoinAmountIn(uint256 tokenAmount) public view returns (uint256) {
        uint256 tokenReserve = mom.balanceOf(address(this));
        uint256 stableCoinReserve = stableCoin.balanceOf(address(this));

        return
            tokenAmount
                .mul(stableCoinReserve)
                .div(tokenReserve.add(tokenAmount))
                .mul(FEE_DIVISOR + FEE_RATE)
                .div(FEE_DIVISOR);
    }

    /**
     * @notice Calculates the amount of stablecoin to be received when selling the given amount of tokens.
     * @dev Uses the constant product formula to determine the amount of stablecoin to be received.
     * @param tokenAmount The amount of tokens to sell.
     * @return The amount of stablecoin to be received.
     */
    function getStableCoinAmountOut(uint256 tokenAmount) public view returns (uint256) {
        uint256 tokenReserve = mom.balanceOf(address(this));
        uint256 stableCoinReserve = stableCoin.balanceOf(address(this));

        return
            tokenAmount
                .mul(stableCoinReserve)
                .div(tokenReserve.add(tokenAmount))
                .mul(FEE_DIVISOR)
                .div(FEE_DIVISOR + FEE_RATE);
    }
}
