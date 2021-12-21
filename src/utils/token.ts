import { Buffer } from "buffer"
import { utils } from "ethers"

export const hashToken = function (account: string, data: string[]) {
  return Buffer.from(
    utils
      .solidityKeccak256(
        ["address", "string", "string"],
        [utils.getAddress(account), data[0], data[1]],
      )
      .slice(2),
    "hex",
  )
}
