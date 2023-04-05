import React, {useState} from "react";
import { Col, Container, Nav, Navbar, Row, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import logoIcon from "./../../assets/icons/livros.png";
import livros from "./../../assets/images/openbook.png";
import "./Quiz.css";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Sun, Moon } from 'react-bootstrap-icons';


export function Quiz() {

    const resultado = useContext(ThemeContext);
    const temaDark = resultado.temaDark;
    const alternar = resultado.alternar;

const pergunta = [{
                enunciado: 'A Literatura é considerada uma forma de Arte, partindo desse pressuposto é correto afirmar que a Arte Literária é:',
                alternativas: [
                    {resp: 'Objetiva', isCorrect: false},
                    {resp: 'Subjetiva',  isCorrect: true},
                    {resp: 'Comparativa',  isCorrect: false},
                    {resp: 'Metafórica',  isCorrect: false},
                    {resp: 'N.D.A.',  isCorrect: false}
                ]
            },

            {
                enunciado: "As primeiras obras literárias produzidas em solo brasileiro com o objetivo de enviar informações a Coroa Portuguesa é conhecida como?",
                alternativas: [
                    {resp: 'Quinhentismo', isCorrect: true},
                    {resp: 'Barroco', isCorrect: false}, 
                    {resp: 'Arcadismo', isCorrect: false},
                    {resp: 'Realismo', isCorrect: false},
                    {resp: 'Renascimento', isCorrect: false}, 
                ],
            },

            {
                enunciado: 'Literatura é uma palavra com origem no termo littera, que significa:',
                alternativas: [
                    {resp: 'Arte', isCorrect: false},
                    {resp: 'Letra', isCorrect: true},
                    {resp: 'Arte das Letras', isCorrect: false},
                    {resp: 'Alfabeto', isCorrect: false},
                    {resp: 'N.D.A', isCorrect: false},
                ],
            },

            {
                enunciado: 'Quem escreveu o romance "Macunaíma"?',
                alternativas: [
                    {resp: 'Tarsila do Amaral', isCorrect: false},
                    {resp: 'Charles Berlitz', isCorrect: false},
                    {resp: 'G. Brocardo', isCorrect: false},
                    {resp: 'Vitor Brecheret', isCorrect: false},
                    {resp: 'Mário de Andrade', isCorrect: true},
                ],
            },

            {
                enunciado: 'Quem escreveu "Orgulho e Preconceito"?',
                alternativas: [
                    {resp: 'Jane Eyre', isCorrect: false},
                    {resp: 'Agatha Christie', isCorrect: false},
                    {resp: 'Jane Austen', isCorrect: true},
                    {resp: 'Noelle Stevenson', isCorrect: false},
                    {resp: 'Sidney Shelldon', isCorrect: false},
                ],
            },

            {
                enunciado: '"Assassinato no Expresso do Oriente" e "Morte no Nilo" são dois títulos dessa escritora inglesa, considerada a rainha do crime:',
                alternativas: [
                    {resp: 'J.K Rowling', isCorrect: false},
                    {resp: 'Agatha Christie', isCorrect: true},
                    {resp: 'Georgia Byng', isCorrect: false},
                    {resp: 'Imelda Staunton', isCorrect: false},
                    {resp: 'Emily Brontë', isCorrect: false},
                ],
            },
]

const [questaoAtual, setQuestaoAtual] = useState(0);

const [showPontos, setShowPontos] = useState(false);

const [ponto, setPonto] = useState(0);

const handleAnswerButtonClick = (isCorrect) => {
    if(isCorrect === true) {
        alert("Resposta certa!");
        setPonto(ponto + 1);
    } 

    const nextQuestion = questaoAtual +1;
    if(nextQuestion < pergunta.length) {
        setQuestaoAtual(nextQuestion);
    } else {
        setShowPontos(true);
    }
}

return (
    <>
    {/* -------------------- Navbar inicio -------------------- */}
    <Navbar bg={temaDark ? "dark" : "success"}
                variant={temaDark ? "dark" : "light"}
                expand="lg">
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
                            <Button variant={temaDark ? "dark" : "success"} onClick={alternar}>
                                {temaDark ? <Moon /> : <Sun style={{color:"yellowgreen"}} />}
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
    </Navbar>
    {/* -------------------- Navbar fim -------------------- */}
        <div className={`${temaDark ? "bg-dark  text-light" : "bg-light text-dark"}`}>
        <Col>
            <Row><h1>Quiz Literário</h1></Row>
            <Row><h2 className="text-center">Mostre que sabe sobre literatura!</h2></Row>
        </Col>
        </div>

        <div  className={`${temaDark ? "bg-dark  text-light" : "bg-light text-dark"} text-center`} >
            <img src={livros} width="500px" height="500px" alt="livros" className="livro-imagem" ></img>
        
    <div className="box">    
    <div className='app'>

        {showPontos ? (
            <div className='score-section'>Você pontuou {ponto} de {pergunta.length}</div>
        ) : (
            <>
                <div className='question-section'>

                    <div className='question-count'>
                        <span>Questão {questaoAtual + 1}</span>/{pergunta.length}
                    </div>

                    <div className='question-text'>{pergunta[questaoAtual].enunciado}</div>
                </div>

                <div className='answer-section'>
                    {pergunta[questaoAtual].alternativas.map((alternativaCorreta, index) => (
                        <button className="rounded-3" onClick={() => handleAnswerButtonClick(alternativaCorreta.isCorrect)} key={index}>{alternativaCorreta.resp}</button>
                    ))}
                </div>
            </>
        )}
        </div>
</div>
</ div>
    </>
);
}


















// const pergunta1 = [{
//     enunciado: "A Literatura é considerada uma forma de Arte, partindo desse pressuposto é correto afirmar que a Arte Literária é:",
//     alternativas: [
//         "Objetiva",
//         "Subjetiva",
//         "Comparativa",
//         "Metafórica",
//         "N.D.A."
//     ],
//     alternativaCorreta: "Subjetiva"
// }]

// const pergunta = [{
//     enunciado: "As primeiras obras literárias produzidas em solo brasileiro com o objetivo de enviar informações a Coroa Portuguesa é conhecida como?",
//     alternativas: [
//         "Quinhentismo",
//         "Barroco",
//         "Arcadismo",
//         "Realismo",
//         "Renascimento"
//     ],
//     alternativaCorreta: "Quinhentismo"
// }]

// const pergunta3 = [{
//     enunciado: "Literatura é uma palavra com origem no termo littera, que significa:",
//     alternativas: [
//         "Arte",
//         "Letra",
//         "Arte das Letras",
//         "Alfabeto",
//         "N.D.A"
//     ],
//     alternativaCorreta: "Letra"
// }]

// const pergunta4 = [{
//     enunciado: "Quem escreveu o romance 'Macunaíma'?",
//     alternativas: [
//         "Tarsila do Amaral",
//         "Charles Berlitz",
//         "G. Brocardo",
//         "Vitor Brecheret",
//         "Mário de Andrade"
//     ],
//     alternativaCorreta: "Mário de Andrade"
// }]

// const pergunta5 = [{
//     enunciado: "Quem escreveu 'Orgulho e Preconceito'?",
//     alternativas: [
//         "Jane Eyre",
//         "Agatha Christie",
//         "Jane Austen",
//         "Noelle Stevenson",
//         "Sidney Shelldon"
//     ],
//     alternativaCorreta: "Jane Austen"
// }]

// const pergunta6 = [{
//     enunciado: "'Assassinato no Expresso do Oriente' e 'Morte no Nilo' são dois títulos dessa escritora inglesa, considerada a rainha do crime:",
//     alternativas: [
//         "J.K Rowling",
//         "Agatha Christie",
//         "Georgia Byng",
//         "Imelda Staunton",
//         "Emily Brontë"
//     ],
//     alternativaCorreta: "Agatha Christie"
// }]

