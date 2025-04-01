import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

const Header = () => {

    return (
    <header>
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid p-2">
                <a className="navbar-brand" href="/"><Logo/></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                <div className="navbar-nav" >
                    <a className="nav-link px-3" aria-current="page" href="#about">About Us</a>
                    <a className="nav-link px-3" aria-current="page" href="#services">Services</a>
                    <a className="nav-link px-3" href="#">Your History</a>
                    <a className="nav-link px-3" href="/login">login</a>
                    <a className="nav-link px-3" href="#">Contact Us</a>
                </div>
                </div>
            </div>
        </nav>
    </header>
    )
}

export default Header


