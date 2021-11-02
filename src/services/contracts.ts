import { utils } from "ethers"
import { Contract } from "@ethersproject/contracts"
import ERC721Facet from "./abis/ERC721Facet.json"

const ABI = {
  ERC721: ERC721Facet.abi,
  Governor: "",
  Raffle: "",
}

const CONTRACT = "0x6EBA841F1201fFDDe7DDC2ba995D3308f6C4aEa0"

export const getContract = function (facet: keyof typeof ABI) {
  const wethInterface = new utils.Interface(ABI[facet])
  return new Contract(CONTRACT, wethInterface)
}
