import { utils } from "ethers"
import { Contract } from "@ethersproject/contracts"
import ERC721Facet from "./abis/ERC721Facet.json"
import GovernorFacet from "./abis/GovernorFacet.json"
import DropFacet from "./abis/DropFacet.json"
import { Web3Provider } from "@ethersproject/providers"

const ABI = {
  ERC721: ERC721Facet.abi,
  Governor: GovernorFacet.abi,
  Drop: DropFacet.abi,
}

const CONTRACT = "0x6EBA841F1201fFDDe7DDC2ba995D3308f6C4aEa0"

export const getContract = function (facet: keyof typeof ABI, provider: Web3Provider) {
  const wethInterface = new utils.Interface(ABI[facet])
  return new Contract(CONTRACT, wethInterface, provider)
}

export const getWojakEventsContract = function (provider: Web3Provider) {
  const wethInterface = new utils.Interface(["event Wojak(uint256 indexed tokenId, string data)"])
  return new Contract(CONTRACT, wethInterface, provider)
}
