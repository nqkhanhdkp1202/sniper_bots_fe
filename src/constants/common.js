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

export const INFURA_URL_LIST = [
  {
    id: 1,
    name: 'Ethereum Mainnet',
    url: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`,
    socket: `wss://mainnet.infura.io/ws/v3/${process.env.REACT_APP_INFURA_API_KEY}`
  },
  {
    id: 2,
    name: 'Goerli Testnet',
    url: `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`,
    socket: `wss://goerli.infura.io/ws/v3/${process.env.REACT_APP_INFURA_API_KEY}`
  },
  {
    id: 3,
    name: 'Arbitrum One',
    url: '',
    socket: ''
  },
  {
    id: 4,
    name: 'Polygon Mainnet',
    url: '',
    socket: ''
  },

  {
    name: 'Optimism',
    url: '',
    socket: ''
  }
]

export const WETH_ADDRESS = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'
