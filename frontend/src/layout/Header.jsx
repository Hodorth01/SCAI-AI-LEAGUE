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
        <Navbar.Brand href="/"><Logo /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav " className='m-2'/>
        <Navbar.Collapse id="basic-navbar-nav"     className='justify-content-center w-100 navbar-collapse-custom'>
          <Nav> {/* Changed from me-auto to ms-auto for right alignment */}
            <Nav.Link href="/#about" className='m-1 fs-5'>About</Nav.Link>
            <Nav.Link href="/#services" className='m-1 fs-5'>Services</Nav.Link>
            <Nav.Link href="/#contact" className='m-1 fs-5'>Contact</Nav.Link>
            

            {user ? (
              <>
                <Nav.Link href="/dashboard" className='m-1 fs-5'>Dashboard</Nav.Link>
                <Nav.Link  className="m-1 fs-5 " disabled >{user.userName}</Nav.Link>
                <Nav.Link href="" className='m-1 fs-5' onClick={handleClick}>Logout</Nav.Link>
              </>
          ) : (
            <>
              <Nav.Link href="/login"  className='m-1 fs-5'>Login</Nav.Link>
              <Nav.Link href="/signup" className='m-1 fs-5' >Signup</Nav.Link>
            </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;