/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'
import Logger from '../../components/Logger'
import { useLog } from '../../contexts/logger.context'

function SwapToken() {
  const { logContent } = useLog()
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [logContent])

  return (
    <main className="main-content position-relative border-radius-lg ">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                <h6>SWAP TOKEN</h6>
              </div>
              <div className="card-body p-4 d-flex">
                <div className="col-8">
                  <div className="">
                    <p>Token Address</p>
                  </div>
                </div>
                <div className="col-4">
                  <h5>Logger</h5>
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
