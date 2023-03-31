import { useEffect, useState } from "react";
import { Button, Container, Table, Modal } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { deleteLivro, getLivros } from "../../firebase/livros";
import "./Livros.css";

export function Livros() {

    const [livros, setLivros] = useState(null);
    const [livroSelecionado, setLivroSelecionado] = useState(null);

    function onSelectLivro(livro) {
        setLivroSelecionado(livro);
      }

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        getLivros().then(resultados => {
            setLivros(resultados)
        })
    }

    function onDeleteLivro(id, titulo) {
        const deletar = window.confirm(`Tem certeza que deseja excluir o livro ${titulo}?`);
        if(deletar) {
            deleteLivro(id).then(() => {
                toast.success(`${titulo} apagado com sucesso!`, {duration: 2000, position: "bottom-right"});
                initializeTable();
            })
        }
    }

    function showLivroDetails(livro){
        setLivroSelecionado(livro);
    }

    function hidelivroDetails() {
        livroSelecionado(null);
    }

    return (
        <div className="livros">
            <Container>
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Livros</h1>
                    <Button as={Link} to="/livros/adicionar" variant="success">
                        Adicionar Livro
                    </Button>
                </div>
                <hr />
                {livros === null ?
                    <Loader />
                    : 
                    <Table striped bordered hover>
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
                            {livros.map(livro => {
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
                                            <Button
                                                as={Link}
                                                to={`/livros/editar/${livro.id}`}
                                                variant="warning"
                                                size="sm"
                                                className="me-2"
                                            >
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                            <Button size="sm" variant="danger" onClick={() => onDeleteLivro(livro.id, livro.titulo)}>
                                                <i className="bi bi-trash3-fill"></i>
                                            </Button>

                                            <Button size="sm"
                                             variant="primary" 
                                             onClick={() => onSelectLivro(livro)}>
                                            <i className="bi bi-info-circle-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                }
                <Modal show={livroSelecionado !== null} onHide={() => setLivroSelecionado(null)}>
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
        <img style={{width:"200px"}} src={livroSelecionado.urlCapa} alt={livroSelecionado.titulo} />
      </div>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setLivroSelecionado(null)}>
      Fechar
    </Button>
  </Modal.Footer>
</Modal>
</Container>
        </div>
    )
}


