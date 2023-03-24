import TokenTransactionChart from '../../components/Chart/Chart'

export default function ChartSimulation() {
  return (
    <main className="main-content position-relative">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="card border-radius-top-start-0 border-radius-top-end-0">
              <div className="card-header">
                <h5 className="h5">CHART SIMULATION</h5>
                <div className="card-body p-4">
                  <TokenTransactionChart />{' '}
                  {/* địa chỉ smart contract của token */}
                  <button></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
