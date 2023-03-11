// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

import {InsufficientTokensInReserve, IncorrectTokenAllowance, NoMatchCreated} from './Errors.sol';
import './Ownership.sol';
import {Match} from './Match.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol';

contract GameV1 is Ownership {
    enum Difficulty {
        Easy,
        Medium,
        Hard
    }
    using SafeERC20Upgradeable for IERC20Upgradeable;
    IERC20Upgradeable public token;
    struct MatchRegister {
        Match matchContract;
        Difficulty difficulty;
        bool awardRequested;
    }
    mapping(address => MatchRegister[]) public matches;

    event MatchCreated(
        address indexed player,
        address indexed matchContract,
        Difficulty difficulty
    );
    event PrizeAwarded(address indexed player, uint256 prize);

    function initialize(address _owner, address _token) public initializer {
        initializeOwnership(_owner);
        token = IERC20Upgradeable(_token);
    }

    // This function returns the rules depending on the difficulty level
    function getRules(
        Difficulty _difficulty
    ) public pure returns (uint8 tokensToPlay, uint8 tokensPrize, uint8 cardsToWin) {
        if (_difficulty == Difficulty.Easy) return (3, 1, 3);
        if (_difficulty == Difficulty.Medium) return (5, 3, 5);
        if (_difficulty == Difficulty.Hard) return (7, 10, 7);
    }

    function getGameTokenBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function _depositTokens(uint8 tokensToPlay) internal {
        uint256 allowance = token.allowance(msg.sender, address(this));
        if (allowance != tokensToPlay) revert IncorrectTokenAllowance();
        token.safeTransferFrom(msg.sender, address(this), tokensToPlay);
    }

    function createMatch(Difficulty _difficulty) external {
        (uint8 tokensToPlay, , uint8 cardsToWin) = getRules(_difficulty);
        _depositTokens(tokensToPlay);
        Match matchContract = new Match(msg.sender, cardsToWin);
        matches[msg.sender].push(MatchRegister(matchContract, _difficulty, false));
        emit MatchCreated(msg.sender, address(matchContract), _difficulty);
    }

    function hasMatch(address player) public view returns (bool) {
        return matches[player].length > 0;
    }

    function getLastMatch() external view returns (Match) {
        if (!hasMatch(msg.sender)) revert NoMatchCreated();
        return matches[msg.sender][matches[msg.sender].length - 1].matchContract;
    }

    function claimPrize() external {
        if (!hasMatch(msg.sender)) revert NoMatchCreated();
        uint8 prize = 0;
        for (uint256 i = 0; i < matches[msg.sender].length; i++) {
            if (matches[msg.sender][i].awardRequested == false) {
                if (matches[msg.sender][i].matchContract.gameWon()) {
                    (, uint8 tokensPrize, ) = getRules(matches[msg.sender][i].difficulty);
                    prize += tokensPrize;
                }
                matches[msg.sender][i].awardRequested = true;
            }
        }
        if (prize == 0) return;
        if (getGameTokenBalance() < prize) revert InsufficientTokensInReserve();
        token.safeTransfer(msg.sender, prize);
        emit PrizeAwarded(msg.sender, prize);
    }

    receive() external payable {}
}
