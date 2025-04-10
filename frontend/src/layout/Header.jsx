import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout.jsx'
import { useAuthContext } from '../hooks/useAuthContext.jsx'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from "../components/Logo";

function Header() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }


  return (
    <Navbar 
      expand="lg" 
      className="bg-body-transparent nav"
    >
      <Container fluid className='px-0 fs-5 '>
        <Navbar.Brand href="#home"><Logo /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='m-2'/>
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-center '>
          <Nav> {/* Changed from me-auto to ms-auto for right alignment */}
            <Nav.Link href="/#about" className='m-2'>About</Nav.Link>
            <Nav.Link href="/#services" className='m-2'>Services</Nav.Link>
            <Nav.Link href="/#contact" className='m-2'>Contact</Nav.Link>
            

            {user ? (
              <>
              <NavDropdown 
              title="Dashboard" 
              id="basic-nav-dropdown"
              className="nav-dropdown m-2"
            >
                <NavDropdown.Item href="/dashboard" className="text-white  ">dahsboard</NavDropdown.Item>
                <NavDropdown.Item href="#leaderboard" className="text-white ">Leaderboard</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link  className="m-2 " disabled >{user.userName}</Nav.Link>
              <Nav.Link href="" className='m-2' onClick={handleClick}>Logout</Nav.Link>
              </>


          ) : (
            <>
            <Nav.Link href="/login"  className='m-2'>Login</Nav.Link>
            <Nav.Link href="/signup" className='m-2' >Signup</Nav.Link>
            </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;