import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Container,
  OverlayTrigger,
  Table,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { getEmprestimos } from "../../firebase/emprestimos";
import { Loader } from "../../components/Loader/Loader";
import { collection, query, orderBy, startAfter, limit, getDocs, startAt, endBefore, limitToLast } from "firebase/firestore";
import { db } from "../../firebase/config"
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export function Emprestimos() {

  const [emprestimos, setEmprestimos] = useState(null);
  const [startDoc, setStartDoc] = useState();
  const [endDoc, setEndDoc] = useState();

  const resultado = useContext(ThemeContext);
  const temaDark = resultado.temaDark;

  useEffect(() => {
    getEmprestimos().then((busca) => {
      setEmprestimos(busca);
    });
  }, []);

  useEffect(() => {
    const primeiraPaginaQuery = query(collection(db, "emprestimos"), orderBy("leitor"), limit(5));
    getDocs(primeiraPaginaQuery).then((snapShot) => {
      if (snapShot.docs.length > 0) {
        const primeiraPagina = snapShot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setEmprestimos(primeiraPagina);
        setStartDoc(snapShot.docs[0]);
        setEndDoc(snapShot.docs[snapShot.docs.length - 1]);
      }
    }).catch(error => console.log(error));
  }, []);

  function avancar() {
    if (!endDoc) return;
    const proximaPaginaQuery = query(collection(db, "emprestimos"), orderBy("leitor"), startAfter(endDoc), limit(5));
    getDocs(proximaPaginaQuery).then((snapShot) => {
      if (snapShot.docs.length > 0) {
        const proximaPagina = snapShot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setEmprestimos([...proximaPagina]);
        setEndDoc(snapShot.docs[snapShot.docs.length - 1]);
        setStartDoc(snapShot.docs[0]);
      }
    }).catch(error => console.log(error));
  }

  function retroceder() {
    if (!startDoc) return;
    const retrocederQuery = query(collection(db, "emprestimos"), orderBy("leitor"), endBefore(startDoc), limitToLast(5));
    getDocs(retrocederQuery).then((snapShot) => {
      if (snapShot.docs.length > 0) {
        const retrocederPagina = snapShot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setEmprestimos([...retrocederPagina]);
        setEndDoc(snapShot.docs[snapShot.docs.length -1]);
        setStartDoc(snapShot.docs[0]);
      }
    }).catch(error => console.log(error));
  }

  return (
    <div
      className={`${
        temaDark ? "bg-dark text-light" : "bg-light text-dark"
      } emprestimos`}
    >
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Emprestimos</h1>
          <OverlayTrigger
            delay={{ hide: 450, show: 300 }}
            overlay={(props) => (
              <Tooltip {...props}>
                Você será direcionado para a página de adicionar empréstimo.
              </Tooltip>
            )}
            placement="left"
          >
            <Button as={Link} to="/emprestimos/adicionar" variant="success">
              Adicionar emprestimo
            </Button>
          </OverlayTrigger>
        </div>
        <hr />
        {emprestimos === null ? (
          <Loader />
        ) : (
          <Table
            striped
            bordered
            hover
            className={temaDark ? "table table-dark" : ""}
          >
            <thead>
              <tr>
                <th>Leitor</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Livro</th>
                <th>Status</th>
                <th>Data de Empréstimo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {emprestimos.map((emprestimo) => {
                const dataEmprestimo = emprestimo.dataEmprestimo
                  .toDate()
                  .toLocaleDateString("pt-br");
                return (
                  <tr key={emprestimo.id}>
                    <td>{emprestimo.leitor}</td>
                    <td>{emprestimo.email}</td>
                    <td>{emprestimo.telefone}</td>
                    <td>{emprestimo.livro.titulo}</td>
                    <td>
                      <Badge
                        bg={
                          emprestimo.status === "Pendente"
                            ? "warning"
                            : "success"
                        }
                      >
                        {emprestimo.status}
                      </Badge>
                    </td>
                    <td>{dataEmprestimo}</td>
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary" id="dropdown-status">
                        {emprestimo.status === "Pendente"
                          ? "Pendente"
                          : "Devolvido"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() =>
                            updateStatus(emprestimo.id, "Pendente")
                          }
                          disabled={emprestimo.status === "Pendente"}
                        >
                          Pendente
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            updateStatus(emprestimo.id, "Devolvido")
                          }
                          disabled={emprestimo.status === "Devolvido"}
                        >
                          Devolvido
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <td>
                      <OverlayTrigger
                        delay={{ hide: 450, show: 300 }}
                        overlay={(props) => (
                          <Tooltip {...props}>
                            Editar dados do empréstimo.
                          </Tooltip>
                        )}
                        placement="auto-start"
                      >
                        <Button
                          as={Link}
                          to={`/emprestimos/editar/${emprestimo.id}`}
                          variant="warning"
                          size="sm"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
        <Pagination>
      <Pagination.Prev onClick={retroceder} />
      <Pagination.Next onClick={avancar}/>
    </Pagination>
      </Container>
    </div>
  );
            }