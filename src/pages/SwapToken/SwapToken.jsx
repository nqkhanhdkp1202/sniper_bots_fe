/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import Button from '../../components/Button/Button'
import CheckBox from '../../components/CheckBox/CheckBox'
import Logger from '../../components/Logger'
import { useLog } from '../../contexts/logger.context'
import './swaptoken.scss'
import {CHAIN_ID, PROVIDER_URL} from '../../constants/common'
import axiosClient from "../../api/axiosClient";
import {chainlistRPC} from "../../api/chainlistRPC";

function SwapToken() {
  const { logContent } = useLog()
  const messagesEndRef = useRef(null)
  const [tokenInfo, setTokenInfo] = useState({
    address: '',
    ABI: '',
    infuraUrl: ''
  })
  const [RPCList, setRPCList] = useState([]);

  const [config, setConfig] = useState({
    buyTimes: 1,
    enableStoploss: 0,
    enableTokenBuy: 0,
    ttokenBuy: 17,
    sstoploss: 0,
    decimals: 18,
    bnbAmount: 0.0001,
    speedms: 0,
    secWait: 1,
    maxSlippage: 10,
    gwei: 5,
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCheckToken = async () => {
    const Web3 = require('web3')
    let providerURL
    for (let [key, value] of Object.entries(PROVIDER_URL)) {
      if (key === tokenInfo.infuraUrl) {
        providerURL = value
      }
    }
    const web3 = await new Web3(new Web3.providers.HttpProvider(providerURL))
    const contractABI = JSON.parse(tokenInfo?.ABI);
    const contractAddress = tokenInfo?.address
    const myContract = await new web3.eth.Contract(contractABI, contractAddress)
    const symbol = await myContract.methods.symbol?.().call()
    const name = await myContract.methods.name?.().call()
    if(symbol || name ) console.log(`Token is: ${name}(${symbol})`);

  }

  useEffect(() => {
    scrollToBottom()
  }, [logContent])

  useEffect(()=> {
    const getRPCs = async () => {
      let chainID
      for (let [key, value] of Object.entries(CHAIN_ID)) {
        if (key === tokenInfo.infuraUrl) {
          chainID = value
        }
      }
      const response = await chainlistRPC.getRPCList(chainID);
      setRPCList(response.pageProps.chain.rpc);
    }
    getRPCs();
  },[tokenInfo.infuraUrl])

  return (
    <main className="main-content position-relative border-radius-lg">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                <h6>SWAP TOKEN</h6>
              </div>
              <div className="card-body p-4 d-flex">
                <div className="col-8 form-swap pe-4 ps-1">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <p className="h6 mb-0">Token Address</p>
                      <div className="input-group">
                        <input
                          className="form-control"
                          style={{ minWidth: '19rem' }}
                          type="text"
                          onChange={e =>
                            setTokenInfo({
                              ...tokenInfo,
                              address: e.target.value
                            })
                          }
                        />
                        <Button
                          onClick={handleCheckToken}
                          className="btn btn-secondary mb-0"
                          type="button"
                          id="button-addon2"
                        >
                          Check token
                        </Button>
                      </div>
                    </div>
                    <div>
                      <p className="h6 mb-0">Contract ABI</p>
                      <div className="input-group">
                        <input
                          className="form-control"
                          style={{ maxWidth: '10rem' }}
                          type="text"
                          onChange={e =>
                            setTokenInfo({
                              ...tokenInfo,
                              ABI: e.target.value
                            })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <p className="h6 mb-0">Select network</p>
                      <select
                        className="form-select network"
                        aria-label="Default select example"
                        onChange={e =>
                          setTokenInfo({
                            ...tokenInfo,
                            infuraUrl: e.target.value
                          })
                        }
                      >
                        <option disabled selected value="">
                          Select Network
                        </option>
                        <option value="ethereum">Ethereum Mainnet</option>
                        <option value="binance">Binance Chain Mainnet</option>
                        <option value="arbitrum">Arbitrum One</option>
                        <option value="polygon">Polygon Mainnet</option>
                        <option value="goerli">Goerli Testnet</option>
                        <option value="optimism">Optimism</option>
                      </select>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <div className="d-flex mb-3 align-items-center">
                      <div className="dropdown me-2">
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
                          style={{maxHeight: "20rem", overflowY: "scroll"}}
                        >
                          {
                            RPCList.map( e => (
                              <li>
                            <span className="dropdown-item m-0">
                              {e.url};
                            </span>
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                      <Button
                        className="btn bg-gradient-light me-2 mb-0"
                        children="Check latency"
                      />
                      <Button
                        className="btn bg-gradient-light me-5 mb-0"
                        children="Check all latency"
                      />
                      <div className="dropdown mx-4">
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
                      <div className="d-flex flex-column align-items-center">
                        <CheckBox title="V1" id="1" />
                        <CheckBox title="V2" id="2" />
                        <CheckBox title="V3" id="3" />
                      </div>
                    </div>
                    <div className="d-grid">
                      <div className="d-flex">
                        <Button
                          className="start btn btn-outline-success px-4 mx-4"
                          children="START"
                        />
                        <Button
                          className="stop btn btn-outline-danger px-4"
                          children="STOP"
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="horizontal dark m-3" />
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        writable
                        title="Token amount buy"
                        id="tokenamount"
                        defaultValue={config.ttokenBuy}
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        writable
                        title="Only buy if token price is less than ($)"
                        id="onlybuy"
                        defaultValue={config.priceBuy}
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        writable
                        title="Max slippage"
                        id="maxslippage"
                        defaultValue={config.maxSlippage}
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        writable
                        title="GWEI to use for trade"
                        id="gwei"
                        defaultValue={config.gwei}
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        writable
                        title="Amount of threads running simultaneously (1 or more)"
                        id="amount-threads"
                        defaultValue={config.amountThreads}
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        writable
                        title="Amount of seconds to wait till sell after buying"
                        id="amount-second"
                        defaultValue={config.secWait}
                      />
                    </div>
                  </div>
                  <hr className="horizontal dark m-3" />
                  <div className="d-flex justify-content-between">
                    <div className="w-65">
                      <div className="d-flex justify-content-between mb-3">
                        <CheckBox
                          writable
                          title="Custom slippage for selling(%, 1=1%)"
                          id="custom-slippage"
                          defaultValue={config.sellSlippage}
                        />
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <CheckBox
                          writable
                          title="Let the bot sell when my loss is this much % (stoploss)"
                          id="stop-loss"
                          defaultValue={config.sstoploss}
                        />
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <CheckBox
                          writable
                          title="Amount of seconds to wait till sell after buying"
                          id="await"
                          defaultValue={config.secWait}
                        />
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <CheckBox
                          writable
                          title="Sell when token price is this much % higher than start"
                          defaultValue={config.priceSell}
                          id="sell-higher"
                        />
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <CheckBox
                          writable
                          title="Sell when token price is more than ($)"
                          id="sell-more-than"
                        />
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <CheckBox
                          id="only-sell"
                          title="Only sell token, don't buy"
                        />
                      </div>
                      <div>
                        <p className="h6 mb-0">Max Gas</p>
                        <input
                          className="form-control"
                          type="number"
                          style={{ maxWidth: '20rem' }}
                          defaultValue={config.gasUsage}
                        />
                      </div>
                    </div>
                    <div className="w-35 ps-4">
                      <div className="mb-3">
                        <p className="h6">Force buy </p>
                        <Button
                          className="btn btn-primary mb-4 me-2 w-100"
                          children="Force buy"
                        />
                      </div>
                      <div className="container text-center ps-3 gap-1">
                        <p className="h6">Force sell </p>
                        <div className="row">
                          <Button
                            className="col-6 btn btn-primary"
                            children="100%"
                          />
                          <Button
                            className="col-6 btn btn-primary"
                            children="50%"
                          />
                        </div>
                        <div className="row">
                          <Button
                            className="col-6 btn btn-primary "
                            children="25%"
                          />
                          <Button
                            className="col-6 btn btn-primary"
                            children="10%"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div
                    className="border border-light rounded p-3 bg-light text-dark"
                    style={{ height: '80vh', overflowY: 'auto' }}
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
