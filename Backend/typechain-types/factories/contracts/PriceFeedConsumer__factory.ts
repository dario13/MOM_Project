/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  PriceFeedConsumer,
  PriceFeedConsumerInterface,
} from "../../contracts/PriceFeedConsumer";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_priceFeed",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getLatestPrice",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60a060405234801561001057600080fd5b506040516104d93803806104d983398181016040528101906100329190610084565b8073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b81525050506100ff565b60008151905061007e816100e8565b92915050565b60006020828403121561009a576100996100e3565b5b60006100a88482850161006f565b91505092915050565b60006100bc826100c3565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600080fd5b6100f1816100b1565b81146100fc57600080fd5b50565b60805160601c6103b7610122600039600081816056015260fc01526103b76000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80638e15f47314610030575b600080fd5b61003861004f565b6040516100469291906102c0565b60405180910390f35b60008060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663feaf968c6040518163ffffffff1660e01b815260040160a06040518083038186803b1580156100ba57600080fd5b505afa1580156100ce573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100f291906101fa565b50505091505060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b15801561016057600080fd5b505afa158015610174573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101989190610275565b905081819350935050509091565b6000815190506101b581610325565b92915050565b6000815190506101ca8161033c565b92915050565b6000815190506101df8161036a565b92915050565b6000815190506101f481610353565b92915050565b600080600080600060a0868803121561021657610215610320565b5b6000610224888289016101d0565b9550506020610235888289016101a6565b9450506040610246888289016101bb565b9350506060610257888289016101bb565b9250506080610268888289016101d0565b9150509295509295909350565b60006020828403121561028b5761028a610320565b5b6000610299848285016101e5565b91505092915050565b6102ab816102e9565b82525050565b6102ba816102fd565b82525050565b60006040820190506102d560008301856102a2565b6102e260208301846102b1565b9392505050565b6000819050919050565b6000819050919050565b600060ff82169050919050565b600069ffffffffffffffffffff82169050919050565b600080fd5b61032e816102e9565b811461033957600080fd5b50565b610345816102f3565b811461035057600080fd5b50565b61035c816102fd565b811461036757600080fd5b50565b6103738161030a565b811461037e57600080fd5b5056fea2646970667358221220efb7ed5df85a29d52710a999d197c9f2a6a77512e43a6f4cc77b1b02b1ceff8d64736f6c63430008070033";

type PriceFeedConsumerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PriceFeedConsumerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PriceFeedConsumer__factory extends ContractFactory {
  constructor(...args: PriceFeedConsumerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _priceFeed: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PriceFeedConsumer> {
    return super.deploy(
      _priceFeed,
      overrides || {}
    ) as Promise<PriceFeedConsumer>;
  }
  override getDeployTransaction(
    _priceFeed: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_priceFeed, overrides || {});
  }
  override attach(address: string): PriceFeedConsumer {
    return super.attach(address) as PriceFeedConsumer;
  }
  override connect(signer: Signer): PriceFeedConsumer__factory {
    return super.connect(signer) as PriceFeedConsumer__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PriceFeedConsumerInterface {
    return new utils.Interface(_abi) as PriceFeedConsumerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PriceFeedConsumer {
    return new Contract(address, _abi, signerOrProvider) as PriceFeedConsumer;
  }
}
