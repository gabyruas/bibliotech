import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export function Home() {

  const [loanCount, setLoanCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [pendingLoanCount, setPendingLoanCount] = useState(0);
  const [returnedLoanCount, setReturnedLoanCount] = useState(0);
  const resultado = useContext(ThemeContext);
  const temaDark = resultado.temaDark;
  

  useEffect(() => {
    async function fetchDataEmprestimos() {
      const emprestimos = await getEmprestimos();
      const loanCount = emprestimos.length;
      setLoanCount(loanCount);
      const pendingLoans = emprestimos.filter(e => !e.data_devolucao);
      const returnedLoans = emprestimos.filter(e => e.data_devolucao);
      setPendingLoanCount(pendingLoans.length);
      setReturnedLoanCount(returnedLoans.length);
    }

    fetchDataEmprestimos();
  }, []);

  useEffect(() => {
    async function fetchDataLivros() {
      const livros = await getLivros();
      const bookCount = livros.length;
      setBookCount(bookCount);
    }

    fetchDataLivros();
  }, []); 

  return (
  
    // <div className={`${temaDark ? "bg-dark text-light" : "bg-light text-dark"}`}>
    //   HOME
    // </div>
    // <div className={`${temaDark ? "bg-dark text-light" : "bg-light text-dark"} ` }>
    <div className= "container mt-4">
      <h5 ><b>Visão Geral</b></h5>
      <hr></hr>

      <Row className="mt-4 justify-content-center">
        <Col md={4} className="d-flex justify-content-center">
          <Card >
            <Card.Body>
              <Card.Title>Total de empréstimos:</Card.Title>
              <Card.Text className="text-success mt-4"><h1>{loanCount}</h1></Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="d-flex justify-content-center">
          <Card>
            <Card.Body >
              <Card.Title>Total de livros cadastrados:</Card.Title>
              <Card.Text className="text-success mt-4"><h1>{bookCount}</h1></Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="d-flex justify-content-center">
          <Card>
            <Card.Body >
              <Card.Title>Devolvidos e Pendentes:</Card.Title>
              <Card.Text className="text-success"><h1>Devolvidos: {returnedLoanCount} <br></br> <span className="text-warning">Pendentes: {pendingLoanCount}</span></h1></Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
    // </div>
    
  );

}
