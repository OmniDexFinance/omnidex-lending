[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Build pass](https://github.com/OmniDexFinance/omnidex-v1-lending-core/actions/workflows/node.js.yml/badge.svg)](https://github.com/omnidexfinance/omnidex-v1-lending-core/actions/workflows/node.js.yml)
```
   ____    __  __   _   _   _____   _____    ______  __   __
  / __ \  |  \/  | | \ | | |_   _| |  __ \  |  ____| \ \ / /
 | |  | | | \  / | |  \| |   | |   | |  | | | |__     \ V / 
 | |  | | | |\/| | | . ` |   | |   | |  | | |  __|     > <  
 | |__| | | |  | | | |\  |  _| |_  | |__| | | |____   / . \ 
  \____/  |_|  |_| |_| \_| |_____| |_____/  |______| /_/ \_\
```

# OmniDex Lending Protocol V1

This repository contains the smart contracts source code and markets configuration for OmniDex Lending Protocol V1. The repository uses Docker Compose and Hardhat as development enviroment for compilation, testing and deployment tasks.

## What is OmniDex Lending?

OmniDex Lending is a decentralized non-custodial liquidity markets protocol where users can participate as depositors or borrowers. Depositors provide liquidity to the market to earn a passive income, while borrowers are able to borrow in an overcollateralized (perpetually) or undercollateralized (one-block liquidity) fashion.

## Documentation

The documentation of OmniDex Lending V1 is in the following [OmniDex Lending V1 documentation](https://omnidex-1.gitbook.io/omnidex/products/lending) link. At the documentation you can learn more about the protocol, see the contract interfaces, integration guides and audits.

OmniDex Lending is a fork of Aave Protocol V2 and as such a more detailed and technical description of the protocol can be found in this repository, [here](./aave-v2-whitepaper.pdf)



## Connect with the community

You can join at the [Discord](https://discord.gg/X3YcpkHY) channel or at the [Telegram group](https://t.me/omnidex1) for asking questions about the protocol or talk about OmniDex Lending with other peers.

## Getting Started

You can install `@omnidexfinance/omnidex-v1-lending-core` as an NPM package in your Hardhat, Buidler or Truffle project to import the contracts and interfaces:

`npm install @omnidexfinance/omnidex-v1-lending-core`

Import at Solidity files:

```
import {ILendingPool} from "@omnidexfinance/omnidex-v1-lending-core/contracts/interfaces/ILendingPool.sol";

contract Misc {

  function deposit(address pool, address token, address user, uint256 amount) public {
    ILendingPool(pool).deposit(token, amount, user, 0);
    {...}
  }
}
```

The JSON artifacts with the ABI and Bytecode are also included into the bundled NPM package at `artifacts/` directory.

Import JSON file via Node JS `require`:

```
const LendingPoolV2Artifact = require('@omnidexfinance/omnidex-v1-lending-core/artifacts/contracts/protocol/lendingpool/LendingPool.sol/LendingPool.json');

// Log the ABI into console
console.log(LendingPoolV2Artifact.abi)
```

## Setup

The repository uses Docker Compose to manage sensitive keys and load the configuration. Prior any action like test or deploy, you must run `docker-compose up` to start the `contracts-env` container, and then connect to the container console via `docker-compose exec contracts-env bash`.

Follow the next steps to setup the repository:

- Install `docker` and `docker-compose`
- Create an enviroment file named `.env` and fill the next enviroment variables

```
# Mnemonic, only first address will be used
MNEMONIC=""

# Add Alchemy or Infura provider keys, alchemy takes preference at the config level
ALCHEMY_KEY=""
INFURA_KEY=""


# Optional Etherscan key, for automatize the verification of the contracts at Etherscan
ETHERSCAN_KEY=""

# Optional, if you plan to use Tenderly scripts
TENDERLY_PROJECT=""
TENDERLY_USERNAME=""

```

## Markets configuration

The configurations related with the OmniDex Markets are located at `markets` directory. You can follow the `IOmniDexConfiguration` interface to create new Markets configuration or extend the current OmniDex Lending configuration.

Each market should have his own Market configuration file, and their own set of deployment tasks, using the OmniDex market config and tasks as a reference.

## Test

You can run the full test suite with the following commands:

```
# In one terminal
docker-compose up

# Open another tab or terminal
docker-compose exec contracts-env bash

# A new Bash terminal is prompted, connected to the container
npm run test
```

## Deployments

For deploying OmniDex Lending Protocol V1, you can use the available scripts located at `package.json`. For a complete list, run `npm run` to see all the tasks.


### Mainnet fork deployment

You can deploy OmniDex Lending Protocol V1 in a forked Mainnet chain using Hardhat built-in fork feature:

```
docker-compose run contracts-env npm run omnidex:fork:main
```

