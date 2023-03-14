// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

import {GameIsOver, OnlyPlayerCanCallThisFunction} from './Errors.sol';
import {IMatch, BetOptions} from './IMatch.sol';

contract Match is IMatch {
    uint8 public immutable cardsToWin;
    address public immutable player;
    uint8 public hand;
    uint8 public lastCard;
    bool private _gameOver;
    bool private _gameWon;
    // the array of 2 dimensions has the following structure:
    // [0] - ♠ (spades)
    // [1] - ♥ (hearts)
    // [2] - ♦ (diamonds)
    // [3] - ♣ (clubs)
    // [0][0] - A (ace)
    // [0][1] - 2
    // [0][2] - 3
    // [0][3] - 4
    // [0][4] - 5
    // [0][5] - 6
    // [0][6] - 7
    // [0][7] - 8
    // [0][8] - 9
    // [0][9] - 10
    // [0][10] - J (jack)
    // [0][11] - Q (queen)
    // [0][12] - K (king)
    // and indicates which cards have been dealt to the player in each hand of the match
    bool[13][4] private _cards;
    event DealtCard(uint8 suit, uint8 value, uint8 hand);
    event BetResult(bool won, uint8 hand);

    constructor(address _player, uint8 _cardsToWin) {
        player = _player;
        cardsToWin = _cardsToWin;
        _dealCard();
    }

    modifier onlyPlayer() {
        if (msg.sender != player) revert OnlyPlayerCanCallThisFunction();
        _;
    }

    function _getRandomValue() private view returns (uint8) {
        uint256 randomValue = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))
        );
        return uint8(randomValue);
    }

    // This function does not really return a random number.
    // The next version will use Chainlink VRF to generate a truly random number.
    function _getRandomCard() private view returns (uint8, uint8) {
        uint8 suit = _getRandomValue() % 3;
        uint8 value = _getRandomValue() % 12;
        return (suit, value);
    }

    function _numberToCard(uint8 number) private pure returns (uint8, uint8) {
        uint8 suit = number / 13;
        uint8 value = number % 13;
        return (suit, value);
    }

    function _cardToNumber(uint8 suit, uint8 value) private pure returns (uint8) {
        return suit * 13 + value;
    }

    // Given two cards: A and B, this function returns if A is higher than B
    function _isHigherThan(uint8 cardA, uint8 cardB) private pure returns (bool) {
        (uint8 suitA, uint8 valueA) = _numberToCard(cardA);
        (uint8 suitB, uint8 valueB) = _numberToCard(cardB);
        if (valueA > valueB) return true;
        if (valueA < valueB) return false;
        if (suitA > suitB) return true;
        return false;
    }

    function _isItAWinningBet(
        uint8 _currentCard,
        uint8 _lastCard,
        BetOptions betOption
    ) private pure returns (bool) {
        if (betOption == BetOptions.Higher) {
            return _isHigherThan(_currentCard, _lastCard);
        }
        return !_isHigherThan(_currentCard, _lastCard);
    }

    // This function deals a card to the player and saves it in the cards array to prevent the player from receiving the same card twice
    // It also saves the card in the lastCard storage variable to be used in the next bet to compare it with the new card
    function _dealCard() private {
        (uint8 suit, uint8 value) = _getRandomCard();
        while (_cards[suit][value] == true) {
            (suit, value) = _getRandomCard();
        }
        _cards[suit][value] = true;
        hand++;
        emit DealtCard(suit, value, hand);
        lastCard = _cardToNumber(suit, value);
    }

    // This function is called by the player to make a bet on the next card
    // if it is higuer indicates that the player bets that the next card will be higher than the last one
    // if it is lower indicates that the player bets that the next card will be lower than the last one
    function bet(BetOptions betOption) external override onlyPlayer {
        if (_gameOver) revert GameIsOver();
        uint8 currentCard = lastCard;
        _dealCard();
        bool betWon = _isItAWinningBet(currentCard, lastCard, betOption);
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
