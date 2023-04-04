import { useContext, useState } from "react";
import {
  Button,
  Container,
  Form,
  Tooltip,
  OverlayTrigger,
  InputGroup
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/icons/google-white.svg";
import facebookIcon from "../../assets/icons/facebook.svg"
import loginImg from "../../assets/images/login.png";
import { AuthContext } from "../../contexts/AuthContext";
import { loginGoogle, loginFacebook, loginEmailSenha } from "../../firebase/auth";
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { Footer } from '../../components/Footer/Footer'

export function Login() {

  const [mostraSenha, setMostraSenha] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    const { email, senha } = data;
    loginEmailSenha(email, senha)
      .then((user) => {
        toast.success(`Entrando como ${user.email}`, {
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
    loginGoogle()
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

  function onLoginFacebook() {
    loginFacebook()
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

  const usuarioLogado = useContext(AuthContext);

  // Se tiver dados no objeto, está logado
  if (usuarioLogado !== null) {
    return <Navigate to="/" />;
  }

  return (
    <Container fluid className="mt-5">
      <p className="text-center">
        <img src={loginImg} width="256" alt="Logo" />
      </p>
      <h4>Bem-vindo(a) de volta!</h4>
      <p className="text-muted">
        Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
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
        <Button className="m-3" variant="danger" onClick={onLoginGoogle}>
          <img src={googleIcon} width="32" alt="Google icon" /> Entrar com o
          Google
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        delay={{ hide: 450, show: 300 }}
        overlay={(props) => (
          <Tooltip {...props}>
            O Facebook compartilhará com Bibliotech seu nome, endereço de e-mail e
            sua foto do perfil.
          </Tooltip>
        )}
        placement="right"
      >
        <Button className="m-3" variant="light" onClick={onLoginFacebook}>
          <img src={facebookIcon} width="32" alt="Facebook icon" /> Entrar com o
          Facebook
        </Button>
      </OverlayTrigger>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="email" style={{ width: '300px' }}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Seu email"
            className={errors.email ? "is-invalid" : ""}
            {...register("email", { required: "Email é obrigatório" })}
          />
          <Form.Text className="invalid-feedback">
            {errors.email?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="senha" style={{ width: '300px' }}>
          <Form.Label>Senha</Form.Label>
          <InputGroup>
            <Form.Control
              type={mostraSenha ? "text" : "password"}
              placeholder="Sua senha"
              className={errors.senha ? "is-invalid" : ""}
              {...register("senha", { required: "Senha é obrigatória" })}
            />
            <Button
              type="button"
              className="secondary"
              variant="outline-success"
              onClick={() => setMostraSenha(!mostraSenha)}>
              {mostraSenha ? <Eye /> : <EyeSlash />}
            </Button>
          </InputGroup>
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
            Entrar
          </Button>
        </OverlayTrigger>
      </Form>

      <footer>
        <Footer />
      </footer>
    </Container>
  );
}
