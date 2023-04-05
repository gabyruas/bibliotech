import "./Menu.css";
import { Button, Nav, Navbar, Offcanvas, OverlayTrigger, Tooltip } from "react-bootstrap";
import logoIcon from "./../../assets/icons/livros.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../firebase/auth";
import React, {useState} from "react";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Sun, Moon } from 'react-bootstrap-icons';




export function Menu() {
  const [show, setShow] = useState(false);

  const resultado = useContext(ThemeContext)
  const temaDark = resultado.temaDark;
  const alternar = resultado.alternar;
  

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    function onLogout() {
      logout().then(() => {
        navigate("/login");
      });}

  return (
    <>
    <Navbar bg={temaDark ? "dark" : "success"}
    variant={temaDark ? "dark" : "light"}
    expand="lg">
      {/* <div className="menu-home"> */}
      <button className={`${temaDark ? "bg-dark text-light" : ""} botao-menu`} onClick={handleShow}>
      <span className={`${temaDark ? "bg-dark text-light" : ""} navbar-toggler-icon`}></span>
      </button>
      {/* </div> */}
      </Navbar>

      <Offcanvas  className={`${temaDark ? "bg-dark text-light" : ""}`} show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
        <div>
          <Offcanvas.Title style={{fontSize: 40}}>Navegue
          <img src={logoIcon} width="32" alt="Logo"/>
          </Offcanvas.Title>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body className={`${temaDark ? "bg-dark text-light" : "bg-success text-dark"} body-menu`}>
          <div className="nav-menu">
          <Nav.Link as={Link} to="/" >
                Home
          </Nav.Link>
          <Nav.Link as={Link} to="/livros">
              Livros
            </Nav.Link>

            <Nav.Link as={Link} to="/emprestimos">
              Empréstimos
            </Nav.Link>

            <Nav.Link as={Link} to="/ajuda">
              Ajuda
            </Nav.Link>

            <Nav.Link as={Link} to="/quiz">
              Quiz!
            </Nav.Link>
            <Button className="trocaTema"variant={temaDark ? "dark" : "success"} onClick={alternar}>
              {temaDark ? <Moon /> : <Sun style={{color:"black"}} />}
            </Button>
            <br/>
            <OverlayTrigger
              delay={{ hide: 450, show: 300 }}
              overlay={(props) => <Tooltip {...props}>Sair</Tooltip>}
              placement="auto-start">
              <Nav.Link onClick={onLogout}>
                <i className="bi bi-box-arrow-right"></i>
              </Nav.Link>
            </OverlayTrigger>
            </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}