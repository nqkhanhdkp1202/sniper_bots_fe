import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { path } from '../../constants/path'
import { AppContext } from '../../contexts/app.context'

function Sidebar() {
  const { reset } = useContext(AppContext)

  const handleLogout = () => {
    reset()
  }

  return (
    <aside
      className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 "
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <i
          className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
        />
        <NavLink className="navbar-brand m-0" to={path.swapToken}>
          <img
            src="../assets/img/logo-ct-dark.png"
            className="navbar-brand-img h-100"
            alt="main_logo"
          />
          <span style={{ fontSize: '20px' }} className="ms-1 font-weight-bold">
            BOT VIP
          </span>
        </NavLink>
      </div>
      <hr className="horizontal dark mt-0" />
      <div
        className="collapse navbar-collapse w-auto"
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to={path.swapToken} className="nav-link">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-ui-04 text-warning text-sm opacity-10" />
              </div>
              <span className="nav-link-text ms-1">Swap Token</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={path.chartSimulation} className="nav-link">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-chart-bar-32 text-success text-sm opacity-10" />
              </div>
              <span className="nav-link-text ms-1">Chart Simulation</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <button
              onClick={handleLogout}
              type="button"
              className="nav-link bg-transparent shadow-none border-0"
              disabled
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-button-power text-dark text-sm opacity-10" />
              </div>
              <span className="nav-link-text ms-1">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
