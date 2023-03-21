/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef} from 'react'
import Logger from '../../components/Logger'
import {useLog} from '../../contexts/logger.context'
import './swaptoken.scss'
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import CheckBox from "../../components/CheckBox/CheckBox";

function SwapToken() {
  const {logContent} = useLog()
  const messagesEndRef = useRef(null)

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
                <div className="col-8 form-swap">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <p className="mb-1">Token Address</p>
                      <Input type="text"/>
                    </div>
                    <div>
                      <p className="mb-1">DEX SWAP</p>
                      <select>
                        <option id="uniswap"> Uniswap</option>
                        <option id="sushiswap"> SushiSwap</option>
                        <option id="pancakeswap"> PancakeSwap</option>
                      </select>
                    </div>
                    <div>
                      <CheckBox title="V1" id="V1"/>
                      <CheckBox title="V2" id="V2"/>
                      <CheckBox title="V3" id="V3"/>

                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox writable title="Only buy if token price is less than ($)"/>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox writable title="Only buy if token price is less than ($)"/>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox writable title="Only buy if token price is less than ($)"/>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox writable title="Only buy if token price is less than ($)"/>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox writable title="Only buy if token price is less than ($)"/>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox writable title="Only buy if token price is less than ($)"/>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox writable title="Only buy if token price is less than ($)"/>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox writable title="Only buy if token price is less than ($)"/>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox writable title="Only buy if token price is less than ($)"/>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox writable title="Only buy if token price is less than ($)"/>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox writable title="Only buy if token price is less than ($)"/>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox writable title="Only buy if token price is less than ($)"/>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox writable title="Only buy if token price is less than ($)"/>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox writable title="Only buy if token price is less than ($)"/>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <CheckBox writable title="Only buy if token price is less than ($)"/>
                    </div>
                  </div>
                  <div className="d-flex mb-3">
                    <p>RPC URL:</p>
                    <select>
                      <option value="">https://abc.com</option>
                      <option value="">https://abc.com</option>
                      <option value="">https://abc.com</option>
                      <option value="">https://abc.com</option>
                      <option value="">https://abc.com</option>
                      <option value="">https://abc.com</option>
                      <option value="">https://abc.com</option>
                      <option value="">https://abc.com</option>
                    </select>
                    <Button children="Check latency"/>
                    <Button children="Check all latency"/>
                  </div>
                  <div className="d-flex gap-md-3 justify-content-center align-items-center">
                    <Button className="start" children="START"/>
                    <Button className="stop" children="STOP"/>
                  </div>
                </div>
                <div className="col-4">
                  <div
                    className="border border-light rounded p-3 bg-light text-dark"
                    style={{height: '70vh', overflowY: 'auto'}}
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
