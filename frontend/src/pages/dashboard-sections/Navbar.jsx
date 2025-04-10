const Navbar = ({ toggleSidebar ,user}) => {
    return(
        <>
            <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl">
                <div className="container-fluid py-1 px-3">
                    <nav aria-label="breadcrumb" >
                            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                            <li className="breadcrumb-item text-sm"><a className="opacity-5 text-white" >Pages</a></li>
                            <li className="breadcrumb-item text-sm text-white active" aria-current="page">Dashboard</li>
                            </ol>
                            <h6 className="font-weight-bolder text-white mb-0">Dashboard</h6>
                    </nav>
                    <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 justify-content-end" id="navbar">
                        <ul className="navbar-nav justify-content-end">
                            <li className="nav-item d-flex align-items-center">
                                <span  className="nav-link text-white font-weight-bold px-0">
                                    <i className="fa fa-user me-sm-1"></i>
                                    <span className="d-sm-inline d-none">{user}</span>
                                </span>
                            </li>
                            <li className="nav-item d-xl-none ps-3 d-flex align-items-center" onClick={toggleSidebar}>
                                <a  className="nav-link text-white p-0" id="iconNavbarSidenav">
                                <div className="sidenav-toggler-inner" >
                                    <i className="sidenav-toggler-line bg-white"></i>
                                    <i className="sidenav-toggler-line bg-white"></i>
                                    <i className="sidenav-toggler-line bg-white"></i>
                                </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar 