import chaiModule from 'chai'
import { solidity } from 'ethereum-waffle'
import { smock } from '@defi-wonderland/smock'
chaiModule.use(solidity)
chaiModule.use(smock.matchers)
export = chaiModule
