/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react'
import Button from '../../components/Button/Button'
import CheckBox from '../../components/CheckBox/CheckBox'
import Input from '../../components/Input/Input'
import Logger from '../../components/Logger'
import {useLog} from '../../contexts/logger.context'
import './swaptoken.scss'

function SwapToken() {
  const {logContent} = useLog()
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
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
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
                <div className="col-8 form-swap pe-4 ps-1">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <p className="h6 mb-0">Token Address</p>
                      <div className="input-group">
                        <Input className="form-control" style={{minWidth: '29rem'}} defaultValue={config.tokenAddress}
                               type="text" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                        <button className="btn btn-secondary mb-0" type="button" id="button-addon2">Check token</button>
                      </div>
                    </div>
                    <div>
                      <p className="h6 mb-0">Max Gas</p>
                      <Input className="form-control" type="number" defaultValue={config.gasUsage}/>
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
                      <Button className="btn bg-gradient-light me-2 mb-0" children="Check latency"/>
                      <Button className="btn bg-gradient-light me-5 mb-0" children="Check all latency"/>
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
                        <CheckBox title="V1" id="V1"/>
                        <CheckBox title="V2" id="V2"/>
                        <CheckBox title="V3" id="V3"/>
                      </div>
                    </div>
                    <div className="d-grid">
                      <div className="d-flex">
                        <Button className="start btn btn-outline-success px-4 mx-4" children="START"/>
                        <Button className="stop btn btn-outline-danger px-4" children="STOP"/>
                      </div>
                    </div>
                  </div>
                  <hr className="horizontal dark m-3"/>
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        writable
                        title="Token amount buy"
                        id="tokenamount"
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        writable
                        title="Only buy if token price is less than ($)"
                        id="onlybuy"
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        writable
                        title="Max slippage"
                        id="maxslippage"
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        writable
                        title="GWEI to use for trade"
                        id="gwei"
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        writable
                        title="Amount of threads running simultaneously (1 or more)"
                        id="amount-threads"
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        writable
                        title="Amount of seconds to wait till sell after buying"
                        id="amount-second"
                      />
                    </div>
                  </div>
                  <hr className="horizontal dark m-3"/>
                  <div className="d-flex justify-content-between">
                    <div className="w-65">
                      <div className="d-flex justify-content-between mb-3">
                        <CheckBox
                          writable
                          title="Custom slippage for selling(%, 1=1%)"
                          id="custom-slippage"
                        />
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <CheckBox
                          writable
                          title="Let the bot sell when my loss is this much % (stoploss)"
                          id="stop-loss"
                        />
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <CheckBox writable title="Amount of seconds to wait till sell after buying" id="await"/>
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <CheckBox writable title="Sell when token price is this much % higher than start"
                                  id="sell-higher"/>
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
                    </div>
                    <div className="w-35 ps-4">
                      <div className="mb-3">
                        <p className="h6">Force buy </p>
                        <Button className="btn btn-primary mb-4 me-2 w-100" children="Force buy"/>
                      </div>
                      <div className="container text-center ps-3 gap-1">
                        <p className="h6">Force sell </p>
                        <div className="row">
                          <Button className="col-6 btn btn-primary" children="100%"/>
                          <Button className="col-6 btn btn-primary" children="50%"/>
                        </div>
                        <div className="row">
                          <Button className="col-6 btn btn-primary " children="25%"/>
                          <Button className="col-6 btn btn-primary" children="10%"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div
                    className="border border-light rounded p-3 bg-light text-dark"
                    style={{height: '80vh', overflowY: 'auto'}}
                  >
                    <Logger/>
                    <div ref={messagesEndRef}/>
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
