import { Container, Nav, Navbar } from "react-bootstrap";
import logoIcon from "./../../assets/icons/livros.png";
import imgCard2 from "./../../assets/images/login.png";
import imgCard1 from "./../../assets/images/openbook.png"
import { Link } from "react-router-dom";
import { Accordion, Carousel, Card,Button } from "react-bootstrap";
import "./Ajuda.css";


export function Ajuda() {

    return (
        <>
            <Navbar bg="success" variant="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand>
                        <Link to="/">
                            <img src={logoIcon} width="32" alt="Logo" />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/">
                                Home
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        <h1>Centro de ajuda</h1>

{/* ---------------------- inicio Carousel ---------------------- */}
    
            <Carousel className="carrossel" >
            <Carousel.Item  className="card">
                    <Card style={{ width: '18rem' }} >
                        <Card.Img style={{width:"7rem"}} variant="top" src={logoIcon}  backgroundColor={{color: "greenyellow"}} />
                        <Card.Body style={{backgroundColor:"greenyellow"}}>
                            <Card.Title><h3>First slide label</h3></Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="success">Acesse</Button>
                        </Card.Body>
                    </Card>
                </Carousel.Item>

                <Carousel.Item>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img style={{width:"7rem"}} variant="top" src={imgCard2} />
                        <Card.Body style={{backgroundColor:"greenyellow"}}>
                            <Card.Title><h3>Second slide label</h3></Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="success">Acesse</Button>
                        </Card.Body>
                    </Card>
                </Carousel.Item>

                <Carousel.Item>
                <Card style={{ width: '18rem' }}>
                <Card.Img style={{width:"7rem"}} variant="top" src={imgCard1} />
                        <Card.Body style={{backgroundColor:"greenyellow"}}>
                            <Card.Title><h3>Third slide label</h3></Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="success">Acesse</Button>
                        </Card.Body>
                    </Card>
                </Carousel.Item>
            </Carousel>
            
{/* ---------------------- fim Carousel ---------------------- */}
<br />
{/* ---------------------- inicio accordion ---------------------- */}
        <Container className="mb-5">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>O que é o Bibliotech?</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>Quanto custa o Bibliotech?</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>Como eu acesso?</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>

{/* ---------------------- fim accordion ---------------------- */}
           </>
    )
}