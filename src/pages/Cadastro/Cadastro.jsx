import {
  Button,
  Container,
  Form,
  OverlayTrigger,
  Tooltip,
  InputGroup
} from "react-bootstrap";
import { Link } from "react-router-dom";
import logoIcon from "../../assets/icons/livros.png";
import googleIcon from "../../assets/icons/google-white.svg";
import { useForm } from "react-hook-form";
import { cadastrarEmailSenha, loginGoogle } from "../../firebase/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeSlash } from 'react-bootstrap-icons';

export function Cadastro() {

  const [mostraSenha, setMostraSenha] = useState(false) // inicia com type "password", ao clicar no botão muda para "text"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    const { email, senha } = data;
    cadastrarEmailSenha(email, senha)
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  function onLoginGoogle() {
    // then = quando der certo o processo
    loginGoogle()
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        // tratamento de erro
        toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  return (
    <Container fluid className="my-5">
      <p className="text-center">
        <img src={logoIcon} width="256" alt="Logo do app" />
      </p>
      <h4>Faça parte da nossa plataforma</h4>
      <p className="text-muted">
        Já tem conta? <Link to="/login">Entre</Link>
      </p>
      <hr />
      <OverlayTrigger
        delay={{ hide: 450, show: 300 }}
        overlay={(props) => (
          <Tooltip {...props}>
            O Google compartilhará com Bibliotech seu nome, endereço de e-mail e
            sua foto do perfil.
          </Tooltip>
        )}
        placement="right"
      >
        <Button className="mb-3" variant="danger" onClick={onLoginGoogle}>
          <img src={googleIcon} width="32" alt="Logo do google" />
          Entrar com o Google
        </Button>
      </OverlayTrigger>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="email" style={{ width: '300px' }}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            className={errors.email && "is-invalid"}
            placeholder="Seu email"
            {...register("email", { required: "O email é obrigatório" })}
          />
          <Form.Text className="invalid-feedback">
            {errors.email?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password" style={{ width: '300px' }}>
          <Form.Label>Senha</Form.Label>
          {/* INICIO  botão mostra/oculta senha */}
          <InputGroup>
            <Form.Control
              type={mostraSenha ? "text" : "password"}
              className={errors.senha && "is-invalid"}
              placeholder="Sua senha"
              {...register("senha", { required: "A senha é obrigatória" })}
            />
            <Button
              type="button"
              className="secondary"
              variant="outline-success"
              onClick={() => setMostraSenha(!mostraSenha)}>
              {mostraSenha ? <Eye /> : <EyeSlash />}
            </Button>
          </InputGroup> 
          {/* FIM botão mostra/oculta senha */}

          <Form.Text className="invalid-feedback">
            {errors.senha?.message}
          </Form.Text>
        </Form.Group>
        <OverlayTrigger
          delay={{ hide: 450, show: 300 }}
          overlay={(props) => (
            <Tooltip {...props}>
              Você será direcionado para a página principal de Bibliotech.
            </Tooltip>
          )}
          placement="right"
        >
          <Button type="submit" variant="success">
            Cadastrar
          </Button>
        </OverlayTrigger>
      </Form>
    </Container>
  );
}
