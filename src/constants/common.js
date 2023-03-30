
export const ARBISCAN_END_POINT = 'https://api.arbiscan.io'
export const ARBISCAN_SECRET_KEY = '2BFRKDIBJVUDRJ5QYQRIU9VEKGIA6BK5QW'
export const BLOCKCHAIN_INFO = {
  ethereum: {
    chainId: 1,
    symbol: "ETH",
    endpointURL: `wss://mainnet.infura.io/ws/v3/${process.env.REACT_APP_INFURA_API_KEY}`,
    funcInitial() {
      const Web3 = require('web3');
      const web3 = new Web3(this.endpointURL);
      return {web3};
    },
    async getABIContract(contractAddress, web3) {
      const contractABI = await web3.eth.getContractAbi(contractAddress);
      return contractABI;
    }
  },
  goerli: {
    chainId: 0,
    symbol: "",
    endpointURL: `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`,
    funcInitial() {
      const GoerliConnector = require('web3');
      const goerliConnector = new GoerliConnector(this.endpointURL);
      return {goerliConnector};
    },
    async getABIContract(contractAddress, web3) {
      const contractABI = await web3.eth.getContractAbi(contractAddress);
      return contractABI;
    }
  },
  binance: {
    chainId: 56,
    symbol: "BNB",
    endpointURL: `https://bsc-dataseed1.binance.org`,
    funcInitial() {
      const BscConnector = require('@binance-chain/bsc-connector');
      const bscConnector = new BscConnector(this.endpointURL);
      return {bscConnector}
    },
    async getABIContract(contractAddress, web3) {
      const contractABI = await this.funcInitial.bscConnector.getContractAbi(contractAddress);
      return contractABI;
    }
  },
  polygon: {
    chainId:137,
    symbol: "MATIC",
    endpointURL: `https://rpc-mainnet.maticvigil.com`,
    funcInitial() {
      const Web3 = require('@maticnetwork/maticjs-web3');
      const web3 = new Web3('https://rpc-mainnet.maticvigil.com');
      return {web3};
    },
    async getABIContract(contractAddress, web3) {
      const contractABI = await web3.eth.getContractAbi(contractAddress);
      return contractABI;
    }
  },
  solana: {
    chainId:101,
    symbol: "SOL",
    endpointURL: `https://api.mainnet-beta.solana.com`,
    funcInitial() {
      const Web3 = require('@solana/web3.js');
      const web3 = new Web3('https://api.mainnet-beta.solana.com');
      return {web3};
    },
    async getABIContract(publickey, web3, TOKEN_PROGRAM_ID) {
      const publicKey = new web3.PublicKey(publickey); // Địa chỉ Contract của token trên mạng Solana
      const connection = new web3.Connection(this.endpointURL);
      const token = new web3.Token(connection, publicKey, TOKEN_PROGRAM_ID, null);
      const tokenInfo = await token.getMintInfo();
      const contractABI = tokenInfo.abi.toJSON();
      return contractABI;
    }
  }
}
