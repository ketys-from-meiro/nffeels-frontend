import { ethers } from "ethers"
export let web3 = undefined

const MaxUint = ethers.constants.MaxUint256

export const registerProvider = wallet => {
  if (wallet) {
    console.log("Using Wallet provider")
    web3 = new ethers.providers.Web3Provider(wallet)
  } else if (window && window.ethereum) {
    console.log("Using Window provider")
    web3 = new ethers.providers.Web3Provider(window.ethereum)
  }
}

export const setApproval = async (contract, spender, amount) => {
  const signer = web3.getSigner()

  const erc20 = new ethers.Contract(
    contract,
    [
      {
        constant: false,
        inputs: [
          {
            name: "_spender",
            type: "address",
          },
          {
            name: "_value",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    signer,
  )
  try {
    return await erc20.approve(spender, amount ? amount : MaxUint)
  } catch (error) {
    return error
  }
}

export const fetchBalance = async (contract, account, digits, fixed) => {
  const erc20 = new ethers.Contract(
    contract,
    [
      {
        constant: true,
        inputs: [
          {
            name: "_owner",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            name: "balance",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    web3,
  )

  const rawNum = await erc20.balanceOf(account)
  const normalised = parseFloat(ethers.utils.formatUnits(rawNum, digits || 18)).toFixed(
    fixed ? fixed : 2,
  )
  return normalised
}

export const fetchAllowance = async (account, contract, spender, digits, fixed) => {
  const erc20 = new ethers.Contract(
    contract,
    [
      {
        constant: true,
        inputs: [
          {
            name: "_owner",
            type: "address",
          },
          {
            name: "_spender",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    web3,
  )

  const rawNum = await erc20.allowance(account, spender)
  const normalised = parseFloat(ethers.utils.formatUnits(rawNum, digits || 18)).toFixed(
    fixed ? fixed : 4,
  )
  return normalised
}

export const zeroAddress = ethers.constants.AddressZero
