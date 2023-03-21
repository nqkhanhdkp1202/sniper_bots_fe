import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ARBISCAN_SECRET_KEY } from '../../constants/common'
import http from '../../utils/http'
import Sidebar from '../Sidebar'

function Contracts() {
  const [data, setData] = useState([])

  useEffect(() => {
    ;(async () => {
      const data = await http.get(
        `/api?module=account&action=txlistinternal&startblock=0&endblock=99999999&page=1&offset=1000&sort=asc&apikey=${ARBISCAN_SECRET_KEY}`
      )
      setData(data?.result)
    })()
  }, [])

  return (
    <div>
      <div className="min-height-300 bg-primary position-absolute w-100" />
      <Sidebar />
      <main className="main-content position-relative border-radius-lg">
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                  <h6>Transactions</h6>
                  <button
                    type="button"
                    className="btn bg-gradient-primary mx-3"
                  >
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                    <span className="mx-2">Refresh</span>
                  </button>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div
                    className="table-responsive p-0"
                    style={{ wordBreak: 'break-all' }}
                  >
                    <table className="table align-items-center justify-content-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-center text-sm text-center font-weight-bolder opacity-7">
                            No.
                          </th>
                          <th className="text-uppercase text-secondary text-center text-sm text-center font-weight-bolder opacity-7">
                            Txn Hash
                          </th>
                          <th className="text-uppercase text-secondary text-center text-sm text-center font-weight-bolder opacity-7 ps-2">
                            Method
                          </th>
                          <th className="text-uppercase text-secondary text-center text-sm text-center font-weight-bolder opacity-7 ps-2">
                            Block
                          </th>
                          <th className="text-uppercase text-secondary text-center text-sm text-center font-weight-bolder opacity-7 ps-2">
                            Age
                          </th>
                          <th className="text-uppercase text-secondary text-center text-sm text-center font-weight-bolder opacity-7 ps-2">
                            From
                          </th>
                          <th className="text-uppercase text-secondary text-center text-sm text-center font-weight-bolder opacity-7 ps-2">
                            To
                          </th>
                          <th className="text-uppercase text-secondary text-center text-sm text-center font-weight-bolder opacity-7 ps-2">
                            Value
                          </th>
                          <th className="text-uppercase text-secondary text-center text-sm text-center font-weight-bolder opacity-7 ps-2">
                            Txn Fee
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((transaction, index) => (
                          <tr key={index + 1}>
                            <td className="text-center text-warning">
                              {index + 1}
                            </td>
                            <td className="text-center">
                              <div className="d-flex justify-content-center align-items-center px-3">
                                <span className="ml-2 text-sm">
                                  {transaction.hash}
                                </span>
                              </div>
                            </td>
                            <td className="text-center">
                              <span className="text-sm font-weight-bold">
                                {transaction.type}
                              </span>
                            </td>
                            <td className="text-center">
                              <span className="text-sm font-weight-bold">
                                {transaction.blockNumber}
                              </span>
                            </td>
                            <td className="text-center">
                              <span className="text-sm font-weight-bold">
                                {moment.unix(transaction.timeStamp).fromNow()}
                              </span>
                            </td>
                            <td className="text-center">
                              <span className="text-sm font-weight-bold">
                                {transaction.from}
                              </span>
                            </td>
                            <td className="text-center">
                              <span className="text-sm font-weight-bold">
                                {transaction.to}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Contracts
