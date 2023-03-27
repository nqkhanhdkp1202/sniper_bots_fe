import TokenChart from '../../components/Chart/Chart'

export default function ChartSimulation() {
  return (
    <main className="main-content position-relative">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="card border-radius-top-start-0 border-radius-top-end-0">
              <div className="card-header min-vh-95 p-0">
                <h5 className="h5 mb-0 p-4">CHART SIMULATION</h5>
                <div className="card-body p-0">
                  <TokenChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
