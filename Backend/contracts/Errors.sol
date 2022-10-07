// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

// General purpose errors
error InvalidInput();
error NotOwner();

// Token errors
error InsufficientTokensInReserve();
error InvalidTokenAmount();
error InvalidTokenAddress();
error TokenAllowanceNotEnough();
error TokenFraction();

// Exchange errors
error EthersTransferFailed();
error MinimumAmountNotReached();
error InsufficientWeiInReserve();

// Game errors
