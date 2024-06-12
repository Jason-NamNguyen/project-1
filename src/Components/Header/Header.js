import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Header = (props) => {
    const isAuthenticated = useSelector(state => state?.userLogin?.isAuthenticated)
    const account = useSelector(state => state?.userLogin?.account)
    const navigate = useNavigate()
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                {/* <Navbar.Brand href="#home"> Bơ Bánh Bao </Navbar.Brand> */}
                <NavLink to="/" className='navbar-brand'>Bơ Bánh Bao</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/' className='nav-link'>Home</NavLink>
                        <NavLink to='/users' className='nav-link'>Users</NavLink>
                        <NavLink to='/admin' className='nav-link'>Admin</NavLink>
                    </Nav>
                    <Nav className='navbar-dropdown'>
                        {isAuthenticated === false ?
                            <>
                                <button className='btn-login' onClick={() => navigate('/login')}>Log in</button>
                                <button className='btn-signup' onClick={() => navigate('/register')}>Sign up</button>
                            </>
                            :
                            <>
                                <img src={`data:image/jpeg;base64, ${account.image}`} alt="..." height={`30px`} />
                                <NavDropdown title={`${account.username}`} id="basic-nav-dropdown">
                                    <NavDropdown.Item>My profile</NavDropdown.Item>
                                    <NavDropdown.Item>Preference</NavDropdown.Item>
                                    <NavDropdown.Item>Log out</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;