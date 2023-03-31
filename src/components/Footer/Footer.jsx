import React from 'react'
import { Link } from 'react-router-dom';
import "./Footer.css";
import { Container } from 'react-bootstrap';


export function Footer() {
    return (
        <Container>
        <div className="footer" >
            <div className="container">
                <div className="row">
                    {/* Coluna 1 */}
                        <h6>Dúvidas? E-mail para <Link>suporte-bibliotech@mail.com</Link></h6>
                    <div className="col-md-3 col-sm-6">

                        <ul className='list-unstyled'>
                            <li><Link>FAQ</Link></li>
                            <li><Link>Avisos legais</Link></li>
                            <li><Link>Informações corporativas</Link></li>
                            <li><Link>Só na Bibliotech</Link></li>
                        </ul>
                    </div>
                    {/* Coluna 2 */}
                    <div className="col-md-3 col-sm-6">
                        
                        <ul className='list-unstyled'>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    {/* Coluna 3 */}
                    <div className="col-md-3 col-sm-6">
                        
                        <ul className='list-unstyled'>
                        
                            <li><Link>Central de ajuda</Link></li>
                            <li><Link>Central de ajuda</Link></li>
                            <li><Link>Entre em contato</Link></li>
                            <li><Link>Privacidade</Link></li>
                        </ul>
                    </div>
                    {/* Coluna 4 */}
                    <div className="col-md-3 col-sm-6">
                        
                        <ul className='list-unstyled'>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p className="text-xs-center">
                        &copy;{new Date().getFullYear()} Bibliotech - Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </div>
        </Container>
    );

}