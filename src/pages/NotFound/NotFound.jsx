import { Button, ButtonGroup, Modal } from "react-bootstrap";
import logoLivros from "../../assets/images/login.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export function NotFound() {
  function Voltar() {
    window.history.back();
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="text-center">
      <img src={logoLivros} width="400" alt="Logo Livros" />
      <h1 className="display-4">Não encontramos: <p className="text-danger">{window.location.pathname}</p></h1>
      <ButtonGroup aria-label="Not Found">
        <Button variant="outline-secondary" onClick={Voltar}>
          Voltar
        </Button>
        <Button variant="outline-success" as={Link} to="/login">
          Login
        </Button>
        <Button variant="outline-danger" onClick={handleShow}>
          Reportar
        </Button>
      </ButtonGroup>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Agradecemos por nos avisar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Seu feedback ajuda nossos desenvolvedores nas melhorias.</p>
            <Link as={Link} to="/ajuda">
              Acesse a nossa Página de Ajuda.
            </Link>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
