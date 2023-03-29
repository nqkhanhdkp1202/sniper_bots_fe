/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import Button from '../../components/Button/Button'
import CheckBox from '../../components/CheckBox/CheckBox'
import Logger from '../../components/Logger'
import { useLog } from '../../contexts/logger.context'
import './swaptoken.scss'
import { PROVIDER_URL } from '../../constants/common'
import Loading from '../../components/Loading'
import { Controller, useForm } from 'react-hook-form'
import { rules } from '../../constants/rules'
import ErrorMessage from '../../components/ErrorMessage'
import queryString from 'query-string'
import { dexList } from '../../api/dexList'

function SwapToken() {
  const { logContent } = useLog()
  const messagesEndRef = useRef(null)
  const [tokenInfo, setTokenInfo] = useState({
    address: '',
    ABI: '',
    infuraUrl: ''
  })
  const [token, setToken] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [DEXList, setDEXList] = useState([])

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      tokenAddress: '',
      ABI: '',
      infuraUrl: ''
    }
  })

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

  const Web3 = require('web3')
  let providerURL = ''
  for (let [key, value] of Object.entries(PROVIDER_URL)) {
    if (key === tokenInfo.infuraUrl) {
      providerURL = value
    }
  }
  const web3 = new Web3(providerURL)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCheckToken = async () => {
    setIsLoading(true)
    // eslint-disable-next-line no-console
    const contractABI = JSON.parse(tokenInfo?.ABI)
    const contractAddress = tokenInfo?.address
    const myContract = await new web3.eth.Contract(contractABI, contractAddress)
    // eslint-disable-next-line no-console
    if (myContract === {}) {
      setToken(myContract)
      searchDEX()
    }
    setIsLoading(false)
  }

  const searchDEX = async () => {
    try {
      const response = await dexList.getPair(`${tokenInfo.address}`)
      setDEXList(response)
    } catch (err) {
      console.log(err)
    }
  }

  console.log(DEXList)

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
                <h5 className="h5 mb-0">SWAP TOKEN</h5>
              </div>
              <div className="card-body p-4 d-flex">
                <div className="col-8 form-swap pe-4 ps-1">
                  <div className="token-controller d-flex justify-content-between mb-3">
                    <div>
                      <p className="h6 mb-0">Token Address</p>
                      <div className="input-group">
                        <input
                          className="form-control"
                          style={{}}
                          type="text"
                          onChange={e =>
                            setTokenInfo({
                              ...tokenInfo,
                              address: e.target.value
                            })
                          }
                        />
                        <Button
                          onClick={searchDEX}
                          className="btn btn-secondary mb-0"
                          type="button"
                          id="button-addon2"
                        >
                          {isLoading ? <Loading /> : 'Check Token'}
                        </Button>
                      </div>
                      <ErrorMessage errors={errors} name="email" />
                    </div>
                    <div>
                      <p className="h6 mb-0">Contract ABI</p>
                      <div className="input-group">
                        <input
                          className="abi-input form-control"
                          style={{ minWidth: '8rem' }}
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
                    <div className="d-flex align-items-center">
                      <div className="dropdown me-4">
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
                          {DEXList.length !== 0
                            ? DEXList.pairs.map((e, index) => (
                                <li key={index}>
                                  <span className="dropdown-item m-0">
                                    {e.dexId}
                                  </span>
                                </li>
                              ))
                            : null}
                        </ul>
                      </div>
                      <div className="d-flex flex-column align-items-start">
                        {DEXList.length !== 0
                          ? DEXList.pairs.map((e, index) => (
                              <CheckBox title={e.labels} id={e.labels} />
                            ))
                          : null}
                      </div>
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
                          style={{ maxHeight: '20rem', overflowY: 'scroll' }}
                        ></ul>
                      </div>
                      <Button
                        className="btn bg-gradient-light me-2 mb-0"
                        children="Check latency"
                      />
                      <Button
                        className="btn bg-gradient-light mb-0"
                        children="Check all latency"
                      />
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
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <p className="h6 mb-0 me-2">Max Gas</p>
                          <input
                            className="form-control"
                            type="number"
                            style={{ maxWidth: '15rem' }}
                            defaultValue={config.gasUsage}
                          />
                        </div>
                        <div className="d-flex align-items-center">
                          <Button
                            className="start btn btn-outline-success px-4 mx-4 mb-0"
                            children="START"
                          />
                          <Button
                            className="stop btn btn-outline-danger px-4 mb-0"
                            children="STOP"
                          />
                        </div>
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
                        <p className="h6">Force sell (%) </p>
                        <div className="row">
                          <Button
                            className="col-6 btn btn-primary"
                            children="100"
                          />
                          <Button
                            className="col-6 btn btn-primary"
                            children="50"
                          />
                        </div>
                        <div className="row">
                          <Button
                            className="col-6 btn btn-primary "
                            children="25"
                          />
                          <Button
                            className="col-6 btn btn-primary"
                            children="10"
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
