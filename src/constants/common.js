export const ARBISCAN_END_POINT = 'https://api.arbiscan.io'
export const ARBISCAN_SECRET_KEY = '2BFRKDIBJVUDRJ5QYQRIU9VEKGIA6BK5QW'
export const PROVIDER_URL = {
  goerli: `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`,
  ethereum: `wss://mainnet.infura.io/ws/v3/${process.env.REACT_APP_INFURA_API_KEY}`
}

export const CHAIN_ID = {
  ethereum: 1,
  binance: 56,
  arbitrum: 42161,
  polygon: 137,
  optimism: 10
}
