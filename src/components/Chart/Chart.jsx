import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import Plot from 'react-plotly.js'

const TokenTransactionChart = () => {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const web3 = new Web3(
      'wss://mainnet.infura.io/ws/v3/501382af7fcb4e54a19008d8b9aab298'
    ) // thay API_KEY bằng API key của bạn

    var subscription = web3.eth.subscribe(
      'logs',
      {
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7'
      },
      function (error, result) {
        // eslint-disable-next-line no-console
        if (!error) console.log(result)
      }
    )

    // unsubscribes the subscription
    subscription.unsubscribe(function (error, success) {
      // eslint-disable-next-line no-console
      if (success) console.log('Successfully unsubscribed!')
    })
    const getTransactions = async () => {
      // lấy tất cả các giao dịch liên quan đến địa chỉ smart contract của token
      const txs = web3.eth
        .getTransaction(
          '0xa0c2bb9b5ffee4262af0e0c0fcde18600116fc4e95b56c57560e2737eb05d586'
        )
        // eslint-disable-next-line no-console
        .then(console.log)
      setTransactions(txs)
    }

    getTransactions()
  }, [])

  const getChartData = () => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        'https://mainnet.infura.io/v3/501382af7fcb4e54a19008d8b9aab298'
      )
    )
    const x = [] // mảng thời gian giao dịch
    const y = [] // mảng giá trị giao dịch

    for (let i = 0; i < transactions.length; i++) {
      const tx = transactions[i]
      const timestamp = web3.eth.getBlock(tx.blockNumber).timestamp // lấy thời gian của khối chứa giao dịch
      const value = web3.utils.fromWei(tx.value, 'ether') // chuyển đổi giá trị giao dịch từ wei sang ether
      x.push(timestamp)
      y.push(value)
    }

    return [{ x: x, y: y, type: 'scatter' }] // dữ liệu biểu đồ
  }

  return (
    <Plot
      data={getChartData()}
      layout={{ title: 'Transaction History' }} // cấu hình biểu đồ
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default TokenTransactionChart
