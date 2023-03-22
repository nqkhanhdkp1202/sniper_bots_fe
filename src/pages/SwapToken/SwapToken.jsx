/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import Button from '../../components/Button/Button'
import CheckBox from '../../components/CheckBox/CheckBox'
import Input from '../../components/Input/Input'
import Logger from '../../components/Logger'
import { useLog } from '../../contexts/logger.context'
import './swaptoken.scss'

function SwapToken() {
  const { logContent } = useLog()
  const messagesEndRef = useRef(null)
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
    infuraUrl: 'https://bsc-dataseed.binance.org/',
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

  useEffect(() => {
    scrollToBottom()
  }, [logContent])

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
                    <Button className="start" children="START" />
                    <Button className="stop" children="STOP" />
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
