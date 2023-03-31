/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import Button from '../../components/Button/Button'
import CheckBox from '../../components/CheckBox/CheckBox'
import Logger from '../../components/Logger'
import { useLog } from '../../contexts/logger.context'
import './swaptoken.scss'
import { CHAIN_ID, INFURA_URL_LIST } from '../../constants/common'
import { chainlistRPC } from '../../api/chainlistRPC'
import Web3 from 'web3'

// import pancakeRouterABI from './abi/pancakeRouterABI.json'
import uniswapRouterABI from './abi/UniswapV2Router02.json'
import Loading from 'src/components/Loading'
import ClearIcon from 'src/components/ClearIcon'

function SwapToken() {
  const [isLoading, setIsLoading] = useState(false)
  const [account, setAccount] = useState(null)
  const { logContent, handleLogContent, resetLoggerMessage } = useLog()
  const messagesEndRef = useRef(null)
  const [tokenInfo, setTokenInfo] = useState({
    address: '',
    ABI: '',
    infuraUrl: INFURA_URL_LIST[0].url
  })

  const [RPCList, setRPCList] = useState([])

  const [config, setConfig] = useState({
    buyTimes: 1,
    enableStoploss: 0,
    enableTokenBuy: 0,
    ttokenBuy: 1,
    sstoploss: 0,
    decimals: 18,
    bnbAmount: 0.0001,
    speedms: 0,
    secWait: 1,
    maxSlippage: 10,
    gwei: 10,
    addedUrl: '',
    enableProfitsell: 1,
    pprofitSell: 10,
    enableWaiting: 1,
    liqBefore: 1,
    approveToken: 1,
    enablePriceBuying: 1,
    enablePriceSelling: 1,
    onlySell: 0,
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

  const web3 = new Web3(tokenInfo.infuraUrl)

  // all dexes
  // const pancakeRouterAddress = '0x10ED43C718714eb63d5aA57B78B54704E256024E'
  // const pancakeRouterContract = new web3.eth.Contract(
  //   pancakeRouterABI,
  //   pancakeRouterAddress
  // )

  const uniswapRouterAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'

  const uniswapRouterContract = new web3.eth.Contract(
    uniswapRouterABI,
    uniswapRouterAddress
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCheckToken = async () => {
    const contractABI = JSON.parse(tokenInfo?.ABI)
    const contractAddress = tokenInfo?.address
    const myContract = await new web3.eth.Contract(contractABI, contractAddress)
    const symbol = await myContract.methods.symbol?.().call()
    const name = await myContract.methods.name?.().call()
    // eslint-disable-next-line no-console
    if (symbol || name) console.log(`Token is: ${name}(${symbol})`)
  }

  useEffect(() => {
    scrollToBottom()
  }, [logContent])

  useEffect(() => {
    ;(async () => {
      const account = web3.eth.accounts.privateKeyToAccount(
        process.env.REACT_APP_PRIVATE_KEY_WALLET
      )
      delete account.privateKey
      setAccount(account)
    })()
  }, [])

  useEffect(() => {
    const getRPCs = async () => {
      let chainID
      for (let [key, value] of Object.entries(CHAIN_ID)) {
        if (key === tokenInfo.infuraUrl) {
          chainID = value
        }
      }
      if (!chainID) setRPCList([])
      else {
        const response = await chainlistRPC.getRPCList(chainID)
        setRPCList(response.pageProps.chain.rpc)
      }
    }
    getRPCs()
  }, [tokenInfo.infuraUrl])

  const handleChangeConfig = e => {
    setConfig({
      ...config,
      [e.target.name]: e.target.value
    })
  }

  const handleSwapToken = async () => {
    try {
      handleLogContent('Swapping token...')
      handleLogContent(
        `Gas Price: ${web3.utils.toWei(String(config.gwei), 'gwei')}`
      )
      setIsLoading(true)
      const tokenInAddress = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'
      const tokenOutAddress = tokenInfo.address
      const amountIn = web3.utils.toWei(String(config.ttokenBuy))
      const amountOutMin = 1
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20

      const nonce = await web3.eth.getTransactionCount(account.address)

      const tx = {
        from: account.address,
        nonce: web3.utils.toHex(nonce),
        to: uniswapRouterAddress,
        value: amountIn,
        gasLimit: web3.utils.toHex(config.gasUsage),
        gasPrice: web3.utils.toWei(String(config.gwei), 'gwei'),
        data: uniswapRouterContract.methods
          .swapExactETHForTokens(
            amountOutMin,
            [tokenOutAddress, tokenInAddress],
            account.address,
            deadline
          )
          .encodeABI()
      }
      handleLogContent('Signing transaction...')
      const signedTx = await web3.eth.accounts.signTransaction(
        tx,
        process.env.REACT_APP_PRIVATE_KEY_WALLET
      )

      const txReceipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      )
      handleLogContent('Handling send transaction')

      console.log('txReceipt: ', txReceipt)
    } catch (error) {
      handleLogContent(error.message, 'danger')
      console.log('error: ', error)
    } finally {
      setIsLoading(false)
    }
  }

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
                  <div className="token-controller d-flex justify-content-between mb-3">
                    <div>
                      <p className="h6 mb-0">Token Address</p>
                      <div className="input-group">
                        <input
                          required
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
                        {INFURA_URL_LIST.map(ifr => (
                          <option key={ifr.id} value={ifr.url}>
                            {ifr.name}
                          </option>
                        ))}
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
                          style={{ maxHeight: '20rem', overflowY: 'scroll' }}
                        >
                          {RPCList.map((e, i) => (
                            <li key={i}>
                              <span className="dropdown-item m-0">
                                {e.url};
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button
                        className="btn bg-gradient-light me-2 mb-0"
                        children="Check latency"
                      />
                      <Button
                        className="btn bg-gradient-light mb-0"
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
                  </div>
                  <hr className="horizontal dark m-3" />
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        name="ttokenBuy"
                        writable
                        title="Token amount buy"
                        id="tokenamount"
                        defaultValue={config.ttokenBuy}
                        onChange={handleChangeConfig}
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        name="priceBuy"
                        writable
                        title="Only buy if token price is less than ($)"
                        id="onlybuy"
                        defaultValue={config.priceBuy}
                        onChange={handleChangeConfig}
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        name="maxSlippage"
                        writable
                        title="Max slippage"
                        id="maxslippage"
                        defaultValue={config.maxSlippage}
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        name="gwei"
                        writable
                        title="GWEI to use for trade"
                        id="gwei"
                        defaultValue={config.gwei}
                        onChange={handleChangeConfig}
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        name="amountThreads"
                        writable
                        title="Amount of threads running simultaneously (1 or more)"
                        id="amount-threads"
                        defaultValue={config.amountThreads}
                        onChange={handleChangeConfig}
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox
                        name="secWait"
                        writable
                        title="Amount of seconds to wait till sell after buying"
                        id="amount-second"
                        defaultValue={config.secWait}
                        onChange={handleChangeConfig}
                      />
                    </div>
                  </div>
                  <hr className="horizontal dark m-3" />
                  <div className="d-flex justify-content-between">
                    <div className="w-65">
                      <div className="d-flex justify-content-between mb-3">
                        <CheckBox
                          name="sellSlippage"
                          writable
                          title="Custom slippage for selling(%, 1=1%)"
                          id="custom-slippage"
                          defaultValue={config.sellSlippage}
                          onChange={handleChangeConfig}
                        />
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <CheckBox
                          name="sstoploss"
                          writable
                          title="Let the bot sell when my loss is this much % (stoploss)"
                          id="stop-loss"
                          defaultValue={config.sstoploss}
                          onChange={handleChangeConfig}
                        />
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <CheckBox
                          name="secWait"
                          writable
                          title="Amount of seconds to wait till sell after buying"
                          id="await"
                          defaultValue={config.secWait}
                          onChange={handleChangeConfig}
                        />
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <CheckBox
                          name="priceSell"
                          writable
                          title="Sell when token price is this much % higher than start"
                          defaultValue={config.priceSell}
                          onChange={handleChangeConfig}
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
                            name="gasUsage"
                            className="form-control"
                            type="number"
                            style={{ maxWidth: '15rem' }}
                            defaultValue={config.gasUsage}
                            onChange={handleChangeConfig}
                          />
                        </div>
                        <div className="d-flex align-items-center">
                          <Button
                            className={`start btn btn-outline-success px-4 mx-4 mb-0 ${
                              isLoading ? 'bg-success' : ''
                            }`}
                            children={
                              isLoading ? <Loading size="small" /> : 'START'
                            }
                            onClick={handleSwapToken}
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
                  <div className="d-flex justify-content-end">
                    <ClearIcon
                      className="cursor-pointer"
                      onClick={resetLoggerMessage}
                    />
                  </div>
                  <div
                    className="mt-2 border border-light rounded p-3 bg-light text-dark"
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
