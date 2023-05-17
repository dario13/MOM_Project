<div align="center">
<img src="https://github.com/dario13/MOM_Project/blob/master/Frontend/public/images/logo.png?raw=true" alt="MOM logo" title="MOM" height="80"/>
</div>

---

## TL;DR

- **[Game](https://mom-project-frontend.vercel.app/)**
- **[Storybook](https://mom-project-storybook.vercel.app)**

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

- [Run project](#run-project)

- [Run Tools](#run-tools)

- [To Do](#to-do)

  <br><br>

## Why MOM?

The name MOM stands for **M**aximum **O**r **M**inimum. It's clearly not the best synonym for Higher or Lower, and was a mistranslation early in development, but I liked the initials and kept that name.<br>
The main purpose of this project is to focus on the technical aspects of a simple business domain.

## About the game

MOM is a simple card game, where you have to guess if the next card in the deck is higher or lower. The game is played with a standard deck of 52 cards. The cards are ranked from highest to lowest as follows: Ace, King, Queen, Jack, 10, 9, 8, 7, 6, 5, 4, 3, 2. The card suit is used when two cards of same value are dealt consecutively, then the suit define what is higher. The suit ranking is:

<br>

1- ♣ (clubs)\
2 - ♦ (diamonds)\
3 - ♥ (hearts)\
4 - ♠ (spades)

The player is dealt one card face up and then bets on whether the next card will be higher or lower. The player wins if their guess is correct. The game offers three different difficulty levels: Easy, Medium, and Hard. The higher the difficulty, the higher the bet and subsequently, the prize. <br>
<br>

## Project structure

The repository is a monorepo, which means that it contains multiple projects. Currently contains 2 projects:

1. The backend project, that uses Hardhat as a development environment, testing framework and deployment tool for Ethereum smart contracts.
2. The frontend project, which is a React app that interacts with the smart contracts.  
   <br>

## Principles

The project is based on the following principles:

- **SOLID**
- **Separation of Concerns (SOC)**
- **Don't Repeat Yourself (DRY)**
- **You Aren't Gonna Need It (YAGNI)**
- **Keep It Simple, Silly (KISS)**
  <br>

## Design Patterns

For the backend, the following design patterns were used:

- **Factory**
- **CEI(Check Effects Interaction)**
- **Proxy Upgrade**

and for the frontend:

- **Provider**
- **Composition**
- **Hooks**
- **Null pattern**

<br>

## Architecture

- **[Model View Presenter](https://khalilstemmler.com/articles/client-side-architecture/layers)** (on the Front)
  <div>
  <img src="https://khalilstemmler.com/img/blog/client-side-architecture/Client-side_architecture_basics_(5).png?raw=true" alt="MVP" title="MVP"/>
  </div>

    <br>

## Methodologies

The items in this section are not strictly related to methodologies, but are concepts that I applied to the project and helped me to maintain an organized, structured and testable code.

- **[Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)**
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
- **CodeQL (on CI)**
- **Docker**
- **ACT** _(Run GitHub Actions locally)_

</td>
</tr>
</table>

## Run project

To run the project, you need to have [Yarn](https://classic.yarnpkg.com/en/docs/install) installed, [Node](https://nodejs.org/en/download/) and [Metamask](https://metamask.io/download/) . <br>

1. Clone the repository

2. Install dependencies

```bash
yarn install
```

3. Run the backend project

Inside the `Backend` folder, run:

```
yarn hardhat node
```

4. Copy the PriceFeedConsumer contract address and paste it in the `env.local.ts` file in the `Frontend/src/config` folder

5. Run the frontend project

Inside the `Frontend` folder, run:

```bash
yarn dev
```

## Run Tools

Because of the monorepo structure, some tools need to be run from the root of the project and others in their own packages(Backend/Frontend). <br>
The context for executing each each tool is clarified in parentheses. <br>

- **Slither and Echidna** _(Backend)_ \
  For running these tools, I use a docker image, you can run this command to get the image:
  ```bash
  docker pull trailofbits/eth-security-toolbox
  ```
  \
  Then you need to run the following command:
  ```bash
  yarn toolbox
  ```
  \
  And inside the container, you can run slither as follows:\
  ```bash
  slither /src/Backend/contracts/ --solc-remaps '@openzeppelin=/src/node_modules/@openzeppelin @chainlink=/src/node_modules/@chainlink' --exclude naming-convention,external-function,low-level-calls
  ```
  \
  And echidna as follows:
  ```bash
  echidna-test /src/Backend/contracts/test/fuzzing/Match.test.sol --contract MatchTest --config /src/Backend/contracts/test/fuzzing/config.yml
  ```
- **Mythril** _(Backend)_ \
  To run mythril, you can do it with docker. First, you need to get the image:

  ```bash
  docker pull mythril/myth
  ```

  \
  Then you can run it (one contract at a time) as follows:

  ```bash
  docker run -v ${PWD%/*}:/src mythril/myth analyze --solc-json /src/Backend/mythril-config.json /src/Backend/contracts/{contract_name}.sol
  ```

- **Storybook** _(Frontend)_ \
  To run storybook, you need to run the following command:
  ```bash
  yarn storybook
  ```

## To Do

- [ ] Create a page for explain how to use the site.
- [ ] Create a page for the user's game history.
- [ ] Deploy in another testnets
