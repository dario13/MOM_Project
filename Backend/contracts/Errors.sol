// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// General purpose errors
error InvalidInput();
error NotOwner();

// Token errors
error InsufficientTokensInReserve();
error InvalidTokenAmount();
error InvalidTokenAddress();
error TokenAllowanceNotEnough();
error IncorrectTokenAllowance();
error TokenFraction();

// Exchange errors
error MaxStableCoinAmountTooLow();
error MinStableCoinAmountTooHigh();

// Game errors
error OnlyPlayerCanCallThisFunction();
error GameIsOver();
error NoMatchCreated();
error GameAlreadyStarted();
