// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

import {GameIsOver, OnlyPlayerCanCallThisFunction, GameAlreadyStarted} from './Errors.sol';
import {IMatch, BetOptions} from './IMatch.sol';
import {IRandomUtils} from './IRandomUtils.sol';

contract Match is IMatch {
    uint8 public immutable cardsToWin;
    address public immutable player;
    uint8 public hand = 0;
    uint8 public lastCard;
    bool private _gameOver;
    bool private _gameWon;
    IRandomUtils public randomUtils;

    // Mapping to store the cards that have been dealt
    mapping(uint8 => bool) private _cards;

    event DealtCard(uint8 card, uint8 hand);
    event BetResult(bool won, uint8 hand);

    constructor(address _player, uint8 _cardsToWin, IRandomUtils _randomUtils) {
        player = _player;
        cardsToWin = _cardsToWin;
        randomUtils = _randomUtils;
    }

    modifier onlyPlayer() {
        if (msg.sender != player) revert OnlyPlayerCanCallThisFunction();
        _;
    }

    function _cardWasDealt(uint8 card) internal view returns (bool) {
        return _cards[card];
    }

    // This function does not really return a random number.
    // The next version will use Chainlink VRF to generate a truly random number.
    function _getRandomCard() private view returns (uint8) {
        uint8 card = randomUtils.getRandomValue() % 52;
        // if the card was dealt, get another
        while (_cardWasDealt(card)) {
            card = randomUtils.getRandomValue() % 52;
        }
        return card;
    }

    function _cardToValue(uint8 card) private pure returns (uint8) {
        return card % 13;
    }

    function _cardToSuit(uint8 card) private pure returns (uint8) {
        return card / 13;
    }

    function _isItAWinningBet(
        uint8 _previousCard,
        uint8 _lastCard,
        BetOptions betOption
    ) private pure returns (bool) {
        uint8 previousValue = _cardToValue(_previousCard);
        uint8 lastValue = _cardToValue(_lastCard);
        uint8 previousSuit = _cardToSuit(_previousCard);
        uint8 lastSuit = _cardToSuit(_lastCard);

        bool isHigherValue = lastValue > previousValue;
        bool isSameValueAndHigherSuit = (lastValue == previousValue) && (lastSuit > previousSuit);
        bool isHigherCard = isHigherValue || isSameValueAndHigherSuit;

        return betOption == BetOptions.Higher ? isHigherCard : !isHigherCard;
    }

    // This function deals a card to the player and saves it in the cards array to prevent the player from receiving the same card twice
    // It also saves the card in the lastCard storage variable to be used in the next bet to compare it with the new card
    function _dealCard() private {
        uint8 card = _getRandomCard();
        _cards[card] = true;
        emit DealtCard(card, hand);
        hand++;
        lastCard = card;
    }

    function startMatch() external override onlyPlayer {
        if (_gameOver) revert GameIsOver();
        if (hand > 0) revert GameAlreadyStarted();
        _dealCard();
    }

    // This function is called by the player to make a bet on the next card
    // if it is higuer indicates that the player bets that the next card will be higher than the last one
    // if it is lower indicates that the player bets that the next card will be lower than the last one
    function bet(BetOptions betOption) external override onlyPlayer {
        if (_gameOver) revert GameIsOver();
        uint8 previousCard = lastCard;
        _dealCard();
        bool betWon = _isItAWinningBet(previousCard, lastCard, betOption);
        if (betWon) {
            if (cardsToWin == hand) {
                _gameOver = true;
                _gameWon = true;
            }
        } else {
            _gameOver = true;
        }
        emit BetResult(betWon, hand);
    }

    function gameWon() external view override returns (bool) {
        return _gameWon;
    }

    function gameOver() external view override returns (bool) {
        return _gameOver;
    }
}
