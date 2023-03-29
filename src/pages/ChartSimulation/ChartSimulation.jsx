import TokenChart from '../../components/Chart/Chart'

export default function ChartSimulation() {
  const pairAddress = "0x16b9a82891338f9ba80e2d6970fdda79d1eb0dae";


  return (
    <main className="main-content position-relative">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="card min-vh-95">
              <div className="d-flex align-items-center justify-content-between card-header p-4">
                <h5 className="h5 mb-0">CHART SIMULATION</h5>
                <div className="d-flex align-items-center">
                  <div className="dropdown mb-0">
                    <a className="btn btn-secondary dropdown-toggle mb-0" href="#" role="button" data-bs-toggle="dropdown"
                       aria-expanded="false">
                      Select DEX
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Uniswap</a></li>
                      <li><a className="dropdown-item" href="#">Sushiswap</a></li>
                      <li><a className="dropdown-item" href="#">Pancakeswap</a></li>
                    </ul>
                  </div>
                  <div className="dropdown mx-3">
                    <a className="btn btn-secondary dropdown-toggle mb-0" href="#" role="button" data-bs-toggle="dropdown"
                       aria-expanded="false">
                      Select Pair
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">WBNB/USDC</a></li>
                      <li><a className="dropdown-item" href="#">WETH/USDC</a></li>
                      <li><a className="dropdown-item" href="#">ARB/BTC</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <TokenChart pairAddress={pairAddress}/>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
