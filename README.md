<div align="center">
<img src="https://github.com/dario13/MOM_Project/blob/master/Frontend/public/images/logo.png?raw=true" alt="MOM logo" title="MOM" height="80"/>
</div>

---

\
This project aims to create a full stack DAPP with focus on best practices and scalability. It's a simple card game but with many applied concepts.

## Table of content

- [Why MOM?](#why-mom)

- [About the game](#about-the-game)

- [Project structure](#project-structure)

- [Principles](#principles)

- [Design Patterns](#design-patterns)

- [Architecture](#architecture)

- [Metodologies](#metodologies)

- [Technologies](#technologies)

- [Installation](#installation)

- [Run Tools](#run-tools)

  <br><br>

## Why MOM?

---

The name MOM stands for **M**aximum **O**r **M**inimum. It's clearly not the best synonym for Higher or Lower, and was a mistranslation early in development, but I liked the initials and kept that name.<br>
The main purpose with which I started this project was to have a simple business domain to focus on the technical aspects of the project.

## About the game

---

MOM is a simple card game, where you have to guess if the next card in the deck is higher or lower. The game is played with a standard deck of 52 cards. The cards are ranked from highest to lowest as follows: King, Queen, Jack, 10, 9, 8, 7, 6, 5, 4, 3, 2, Ace. The card suit is used when two cards of same value are dealt one after the other, then the suit define what is higher. The suit ranking is:

<br>

1- ♣ (clubs)\
2 - ♦ (diamonds)\
3 - ♥ (hearts)\
4 - ♠ (spades)

The game is played with a single deck of cards. The player is dealt one card face up. The player then bets on whether the next card will be higher or lower. The player wins if the next card is higher or lower than the previous card. <br>
The player can choose between 3 different difficulty levels: Easy, Medium and Hard (the higher the difficulty, the higher the bet and subsequently the prize) <br>
<br>

## Project structure

---

<br>

## Principles

---

- **SOLID**
- **Separation of Concerns (SOC)**
- **Don't Repeat Yourself (DRY)**
- **You Aren't Gonna Need It (YAGNI)**
- **Keep It Simple, Silly (KISS)**
  <br>

## Design Patterns

---

- **Factory**
- **CEI(Check Effects Interaction)**
- **Proxy Upgrade**

<br>

## Architecture

---

- **Model View Presenter (on the Front)**

## Methodologies

---

The items in this section are not strictly related to methodologies, but are concepts that I applied to the project and helped me to maintain an organized, structured and testable code.

- **Atomic Design**
- **GitFlow**
- **Monorepo**
- **Continous Integration**
- **Continous Deployment**
- **Conventionnal Commits**
- **Semantic Versioning**
- **Linting and Formatting**
- **Unit Testing**
- **Fuzzing Testing**

  <br>

## Technologies

---

The most relevant technologies used in this project are:

<table>
<tr>
<th> Back </th>
<th> Front </th>
<th> General </th>
</tr>
<tr>
<td>

- **Solidity**
- **Hardhat**
- **OpenZeppelin**
- **Chainlink**
- **Ethers.js**
- **Slither**
- **Chai**

</td>
<td>

- **ReactJS**
- **NextJS**
- **Storybook**
- **Zustand**
- **Jest**
- **React Testing Library**
- **Tailwind CSS**

</td>
<td>

- **Typescript**
- **Lerna**
- **Yarn Workspaces**
- **ESLint**
- **Prettier**
- **Husky**
- **Lint Staged**
- **Commitlint**
- **Docker**
- **ACT** _(Run GitHub Actions locally)_

</td>
</tr>
</table>

## Installation

---

## Run Tools

---

Because of the monorepo structure, some tools need to be run from the root of the project and others in their own packages(Backend/Frontend). Example: if you want to run NextJS, you need to open terminal and if you are located in the root folder of the project, then type:\
`cd Backend` \
and then you can run: \
`yarn dev` \
<br>
The context for executing each each tool is clarified in parentheses. <br>

- **Slither and Echidna** _(Backend)_ \
  For running these tools, I use a docker image, you can run this command to get the image:\
  `docker pull trailofbits/eth-security-toolbox`\
  \
  Then you need to run the following command:\
   `yarn toolbox`\
  \
  And inside the container, you can run slither as follows:\
   `slither /src/Backend/contracts/ --solc-remaps '@openzeppelin=/src/node_modules/@openzeppelin @chainlink=/src/node_modules/@chainlink' --exclude naming-convention,external-function,low-level-calls`\
  \
  And echidna as follows:\
   `echidna-test /src/Backend/contracts/test/fuzzing/Match.test.sol --contract MatchTest --config /src/Backend/contracts/test/fuzzing/config.yml`
