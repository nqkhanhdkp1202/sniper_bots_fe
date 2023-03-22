/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import Button from '../../components/Button/Button'
import CheckBox from '../../components/CheckBox/CheckBox'
import Input from '../../components/Input/Input'
import Logger from '../../components/Logger'
import { useLog } from '../../contexts/logger.context'
import './swaptoken.scss'
import { Contract } from 'web3-eth-contract'

import Web3 from 'web3'
import Loading from 'src/components/Loading'
// import WalletConnectProvider from '@walletconnect/web3-provider'
// import {
// import Button from './../../components/Button/Button';
// ChainId,
//   Token,
//   WETH,
//   Fetcher,
//   Route,
//   Trade,
//   TokenAmount,
//   TradeType
// } from '@uniswap/sdk'

const WETH = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'
const providerUrl = `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`
const web3 = new Web3(providerUrl)

const pancakeRouterABI = require('./pancakeRouterABI.json')
const pancakeRouterAddress = '0x10ed43c718714eb63d5aa57b78b54704e256024e'
const pancakeRouterContract = new Contract(
  pancakeRouterAddress,
  pancakeRouterABI,
  web3
)

function SwapToken() {
  const { logContent } = useLog()
  const messagesEndRef = useRef(null)
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(null)
  const [amountWETH, setAmountWETH] = useState(null)
  const [config, setConfig] = useState({
    buyTimes: 1,
    enableStoploss: 0,
    enableTokenBuy: 0,
    ttokenBuy: 17,
    sstoploss: 0,
    tokenAddress: 0x94241428e0e36df628e0c2485bc0e158a5da3362,
    decimals: 18,
    bnbAmount: 0.0001,
    speedms: 0,
    secWait: 1,
    maxSlippage: 10,
    gwei: 5,
    infuraUrl: 'https://goerli.infura.io/v3/f637cdaa382546ddb75eaf8ae149646b',
    addedUrl: '',
    enableProfitsell: 1,
    pprofitSell: 10,
    enableWaiting: 1,
    liqBefore: 1,
    approveToken: 1,
    enablePriceBuying: 1,
    enablePriceSelling: 1,
    onlySell: 0,
    tokenBuy: 0,
    gasUsage: 500000,
    sellSlippage: 40,
    priceBuy: 2,
    priceSell: 0.5,
    sellTimesEnable: 0,
    sellTimes: 1,
    version: 2,
    retryWhenerror: '0',
    amountThreads: 1,
    getClipboard: 1
  })

  useEffect(() => {
    ;(async () => {
      const account = web3.eth.accounts.privateKeyToAccount(
        process.env.REACT_APP_PRIVATE_KEY_WALLET
      )
      setAccount(account)
    })()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [logContent])

  // web3.eth.getBalance(wethAddress, account, function(error, result) {
  //   if (!error) {
  //     console.log(`Balance of WETH for ${account}: ${web3.utils.fromWei(result, 'ether')}`);
  //   } else {
  //     console.error(error);
  //   }
  // });

  useEffect(() => {
    if (account) {
      const fetchBalanceAndToken = async () => {
        const balance = await web3.eth.getBalance(account?.address)
        setBalance(web3.utils.fromWei(balance))

        const balanceOfTokenAHex = await web3.eth.call({
          to: WETH,
          data:
            '0x70a08231000000000000000000000000' + account?.address.substring(2)
        })
        const balanceOfTokenA = web3.utils.hexToNumberString(balanceOfTokenAHex)
        setAmountWETH(web3.utils.fromWei(balanceOfTokenA))
      }
      fetchBalanceAndToken()
    }
  }, [account])

  const getPriceToken = async () => {
    const tokenAddress = '0xCc7bb2D219A0FC08033E130629C2B854b7bA9195'
    const amountsOut = await pancakeRouterContract.methods
      .getAmountsOut(web3.utils.toWei('1', 'ether'), [WETH, tokenAddress])
      .call()
    console.log('amountsOut[1]: ', amountsOut)
    return amountsOut[1]

    // const tokenAddress = '0x...' // Address of the token you want to get the price of
    // const bnbAmount = web3.utils.toWei('1', 'ether') // Amount of BNB to exchange for the token (in wei)
    // const path = [
    //   web3.utils.toChecksumAddress(
    //     '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
    //   ),
    //   tokenAddress
    // ] // The path of the exchange (BNB to token)
    // const [outputAmount] = await router.methods
    //   .getAmountsOut(bnbAmount, path)
    //   .call() // Get the output amount of the exchange
    // const price = parseFloat(web3.utils.fromWei(outputAmount, 'ether')) // Convert the output amount to the price of the token (in BNB)
  }

  const handleSwap = async () => {
    // const ZETA = new Token(
    //   ChainId.GOERLI,
    //   '0xCc7bb2D219A0FC08033E130629C2B854b7bA9195',
    //   18
    // )
    // const WETH_GOERLI = WETH[ChainId.GOERLI]
    // const pair = await Fetcher.fetchPairData(ZETA, WETH_GOERLI)
    // const route = new Route([pair], WETH_GOERLI)
    // const trade = new Trade(
    //   route,
    //   new TokenAmount(ZETA, 10),
    //   TradeType.EXACT_INPUT
    // )
    // // const slippageTolerance = new Percent('50', '10000') // 0.5%
    // const slippageTolerance = 0.005 // 0.5%
    // const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw
    // const path = [ZETA.address, WETH_GOERLI.address]
    // const to = account
    // const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes
    // const value = trade.inputAmount.raw
    // const uniswapRouterAddress = '<UNISWAP_ROUTER_ADDRESS>'
    // const privateKeyBuffer = Buffer.from(
    //   process.env.REACT_APP_PRIVATE_KEY_WALLET,
    //   'hex'
    // )
    // const nonce = await web3.eth.getTransactionCount(account)
    // const txObject = {
    //   from: account,
    //   to: uniswapRouterAddress,
    //   value: '0x0',
    //   data: router.methods
    //     .swapExactTokensForETHSupportingFeeOnTransferTokens(
    //       value,
    //       amountOutMin,
    //       path,
    //       to,
    //       deadline
    //     )
    //     .encodeABI(),
    //   nonce: web3.utils.toHex(nonce),
    //   gasLimit: web3.utils.toHex(300000),
    //   gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei'))
    // }
    // const signedTx = await web3.eth.accounts.signTransaction(
    //   txObject,
    //   privateKeyBuffer
    // )
    // const txReceipt = await web3.eth.sendSignedTransaction(
    //   signedTx.rawTransaction
    // )
    // console.log('Transaction receipt:', txReceipt)
  }

  return (
    <main className="main-content position-relative border-radius-lg">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                <h6>SWAP TOKEN</h6>
                <div className="d-flex align-items-center">
                  <Button className="btn-success">
                    {balance ? (
                      `Balance: ${Number(balance).toFixed(4)}`
                    ) : (
                      <Loading width={20} height={20} />
                    )}
                  </Button>
                  <Button className="mx-2 btn-success">
                    {amountWETH ? (
                      `WETH: ${amountWETH}`
                    ) : (
                      <Loading width={20} height={20} />
                    )}
                  </Button>
                </div>
              </div>
              <div className="card-body p-4 d-flex">
                <div className="col-8 form-swap">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <p className="h6 mb-0">Token Address</p>
                      <Input style={{ minWidth: '21rem' }} type="text" />
                    </div>

                    <div>
                      <p className="h6 mb-0">BNB Amount</p>
                      <Input type="text" />
                    </div>

                    <div>
                      <p className="h6 mb-0">Buy Times</p>
                      <Input type="text" />
                    </div>

                    <div>
                      <p className="h6 mb-0">Max Gas</p>
                      <Input type="text" />
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <div className="d-flex mb-3">
                      <span className="my-auto h6">RPC URL</span>
                      <div className="dropdown mx-3">
                        <button
                          className="btn bg-gradient-light dropdown-toggle m-0"
                          type="button"
                          id="dropdownMenuButton"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Select RPC
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <li>
                            <span className="dropdown-item m-0">
                              https://abc.com
                            </span>
                          </li>
                          <li>
                            <span className="dropdown-item m-0">
                              https://abc.com
                            </span>
                          </li>
                          <li>
                            <span className="dropdown-item m-0">
                              https://abc.com
                            </span>
                          </li>
                          <li>
                            <span className="dropdown-item m-0">
                              https://abc.com
                            </span>
                          </li>
                          <li>
                            <span className="dropdown-item m-0">
                              https://abc.com
                            </span>
                          </li>
                          <li>
                            <span className="dropdown-item m-0">
                              https://abc.com
                            </span>
                          </li>
                          <li>
                            <span className="dropdown-item m-0">
                              https://abc.com
                            </span>
                          </li>
                          <li>
                            <span className="dropdown-item m-0">
                              https://abc.com
                            </span>
                          </li>
                        </ul>
                      </div>
                      <Button children="Check latency" />
                      <Button children="Check all latency" />
                    </div>
                    <div className="d-flex">
                      <div className="dropdown mx-3">
                        <button
                          className="btn bg-gradient-warning dropdown-toggle m-0"
                          type="button"
                          id="dropdownMenuButton"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Select Dex
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <li>
                            <span className="dropdown-item m-0">Uniswap</span>
                          </li>
                          <li>
                            <span className="dropdown-item m-0">
                              Pancake Swap
                            </span>
                          </li>
                          <li>
                            <span className="dropdown-item m-0">SushiSwap</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <CheckBox title="V1" id="V1" />
                        <CheckBox title="V2" id="V2" />
                        <CheckBox title="V3" id="V3" />
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox writable title="Token amount buy" />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        writable
                        title="Only buy if token price is less than ($)"
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox writable title="Max slippage" />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox writable title="GWEI to use for trade" />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        writable
                        title="Amount of threads running simultaneously (1 or more)"
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        writable
                        title="Amount of seconds to wait till sell after buying"
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        writable
                        title="Sell when token price is this much % higher than start"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        writable
                        title="Custom slippage for selling(%, 1=1%)"
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        writable
                        title="Let the bot sell when my loss is this much % (stoploss)"
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox writable title="Only sell token, don't buy" />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox writable title="Sell this many times" />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        writable
                        title="Only buy if token price is less than ($)"
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        writable
                        title="Only buy if token price is less than ($)"
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        writable
                        title="Only buy if token price is less than ($)"
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        writable
                        title="Only buy if token price is less than ($)"
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-md-3 justify-content-center align-items-center">
                    <Button
                      className="start"
                      children="START"
                      onClick={handleSwap}
                    />
                    <Button
                      className="stop"
                      children="STOP"
                      onClick={getPriceToken}
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div
                    className="border border-light rounded p-3 bg-light text-dark"
                    style={{ height: '70vh', overflowY: 'auto' }}
                  >
                    <Logger />
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SwapToken
