import { useEffect, useState } from "react";
import {
  Button,
  Container,
  OverlayTrigger,
  Table,
  Tooltip,
  Modal
} from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { deleteLivro, getLivros } from "../../firebase/livros";
import "./Livros.css";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export function Livros() {

  const [livros, setLivros] = useState(null);
  const [livroSelecionado, setLivroSelecionado] = useState(null);

  const resultado = useContext(ThemeContext);
  const temaDark = resultado.temaDark;
  
  function onSelectLivro(livro) {
    setLivroSelecionado(livro);
  }

  useEffect(() => {
    initializeTable();
  }, []);


  function initializeTable() {
    getLivros().then((resultados) => {
      setLivros(resultados);
    });
  }

  function onDeleteLivro(id, titulo) {
    const deletar = window.confirm(
      `Tem certeza que deseja excluir o livro ${titulo}?`
    );
    if (deletar) {
      deleteLivro(id).then(() => {
        toast.success(`${titulo} apagado com sucesso!`, {
          duration: 2000,
          position: "bottom-right",
        });
        initializeTable();
      });
    }
  }


//   function showLivroDetails(livro) {
//     setLivroSelecionado(livro);
//   }

//   function hidelivroDetails() {
//     livroSelecionado(null);
//   }

  return (
    <div className={`${temaDark ? "bg-dark text-light" : "bg-light text-dark"} livros`}>
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Livros</h1>
          <OverlayTrigger
            delay={{ hide: 450, show: 300 }}
            overlay={(props) => (
              <Tooltip {...props}>
                Você será direcionado para a página de cadastro de livro.
              </Tooltip>
            )}
            placement="left"
          >
            <Button as={Link} to="/livros/adicionar" variant="success">
              Adicionar Livro
            </Button>
          </OverlayTrigger>
        </div>
        <hr />
        {livros === null ? (
          <Loader />
        ) : (
          <Table striped bordered hover className={temaDark ? "table table-dark" : ""}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Categoria</th>
                <th>ISBN</th>
                <th>Imagem</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {livros.map((livro) => {
                return (
                  <tr key={livro.id}>
                    <td>{livro.titulo}</td>
                    <td>{livro.autor}</td>
                    <td>{livro.categoria}</td>
                    <td>{livro.isbn}</td>
                    <td>
                      <img src={livro.urlCapa} alt={livro.titulo} />
                    </td>
                    <td>
                      <OverlayTrigger
                        delay={{ hide: 450, show: 300 }}
                        overlay={(props) => (
                          <Tooltip {...props}>Editar dados do livro</Tooltip>
                        )}
                        placement="top"
                      >
                        <Button
                          as={Link}
                          to={`/livros/editar/${livro.id}`}
                          variant="warning"
                          size="sm"
                          className="me-2"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        delay={{ hide: 450, show: 300 }}
                        overlay={(props) => (
                          <Tooltip {...props}>Deletar livro</Tooltip>
                        )}
                        placement="top"
                      >
                        <Button
                          size="sm"
                          variant="danger"
                          className="me-2"
                          onClick={() => onDeleteLivro(livro.id, livro.titulo)}
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        delay={{ hide: 450, show: 300 }}
                        overlay={(props) => (
                          <Tooltip {...props}>Detalhes do livro</Tooltip>
                        )}
                        placement="top"
                      >
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => onSelectLivro(livro)}
                      >
                        <i className="bi bi-info-circle-fill"></i>
                      </Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
        <Modal
          show={livroSelecionado !== null}
          onHide={() => setLivroSelecionado(null)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Detalhes do Livro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {livroSelecionado && (
              <div>
                <h5>{livroSelecionado.titulo}</h5>
                <p>Autor: {livroSelecionado.autor}</p>
                <p>Categoria: {livroSelecionado.categoria}</p>
                <p>ISBN: {livroSelecionado.isbn}</p>
                <img
                  style={{ width: "200px" }}
                  src={livroSelecionado.urlCapa}
                  alt={livroSelecionado.titulo}
                />
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setLivroSelecionado(null)}
            >
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}