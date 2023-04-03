import "./Footer.css";
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faInstagram, faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
    MDBFooter,
    MDBContainer,
    MDBBtn
} from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <MDBFooter className='bg-light text-center text-white mt-4'>
            <MDBContainer className='p-4 pb-0'>
                <Row>
                    <Col>
                        <div className="bg-light social-icons mb-2">
                            <MDBBtn
                                className='m-2 border border-none'
                                style={{ backgroundColor: '#333333' }}
                                href="https://github.com">
                                <FontAwesomeIcon icon={faGithub} />
                            </MDBBtn>

                            <MDBBtn
                                className='m-2 border border-none'
                                style={{ backgroundColor: '#3B5998' }}
                                href="https://www.facebook.com">
                                <FontAwesomeIcon icon={faFacebook} />
                            </MDBBtn>

                            <MDBBtn
                                className='m-2 border border-none'
                                style={{ backgroundColor: '#ac2bac' }}
                                href="https://www.instagram.com">
                                <FontAwesomeIcon icon={faInstagram} />
                            </MDBBtn>

                            <MDBBtn className='m-2 border border-none'
                                style={{ backgroundColor: '#db4a39' }}
                                href="https://www.google.com">
                                <FontAwesomeIcon icon={faGoogle} />
                            </MDBBtn>

                            <MDBBtn className='m-2 border border-none'
                                style={{ backgroundColor: '#0082ca' }}
                                href="https://www.linkedin.com/in/gustavoleonardi/"
                                role='button'>
                                <FontAwesomeIcon icon={faLinkedin} />
                            </MDBBtn>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className='text-center p-3' style={{ backgroundColor: '#198754ab' }}>

                            <a className='text-light' href='https://www.linkedin.com/in/gustavoleonardi/'>
                                © Gustavo Leonardi
                            </a>
                        </div>
                    </Col>
                </Row>
            </MDBContainer>
        </MDBFooter>
    );
}
