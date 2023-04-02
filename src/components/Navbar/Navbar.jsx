import { Navbar, Nav } from 'react-bootstrap';
import { useContext } from 'react';
import AuthContext from './AuthContext';
import './navbar.css';

function AppNavbar() {
  const authContext = useContext(AuthContext);

  const displayName = authContext.displayName || authContext.email.split('@')[0];

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">Minha Biblioteca</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">Livros</Nav.Link>
          <Nav.Link href="#">Empréstimos</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Item>
            <Nav.Link href="#">{displayName}</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}