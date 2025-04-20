import { useState } from 'react';
import Logo from '../../components/Logo';
const Sidebar = ({ isMinimized, toggleSidebar }) => {
  return (
    <aside className={`sidenav bg-black navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 ${isMinimized ? 'minimized' : ''}`} id="sidenav-main">
      <div className="sidenav-header">
        <i 
          className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" 
          aria-hidden="true" 
          id="iconSidenav"
          onClick={toggleSidebar}
        />
        <a className="navbar-brand m-0 d-flex" href="/" >
            <Logo/>
        </a>
      </div>
      <hr className="horizontal dark mt-0"/>
      <div className="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" href="../pages/dashboard.html">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-dark text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-calendar-grid-58 text-dark text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Home</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;