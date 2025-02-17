import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { adicionarEmprestimo } from "../../firebase/emprestimos";
import { getLivro, getLivros } from "../../firebase/livros";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export function AdicionarEmprestimo() {
  const [livros, setLivros] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const resultado = useContext(ThemeContext);
  const temaDark = resultado.temaDark;

  function onSubmit(data) {
    getLivro(data.idLivro).then((livro) => {
      delete data.idLivro;
      const novoEmprestimo = {
        ...data,
        status: "Pendente",
        livro,
        dataEmprestimo: new Date(),
      };

      if (new Date(data.dataEntrega) > new Date()) {
        novoEmprestimo.status = "Em andamento";
      } else {
        novoEmprestimo.status = "Atrasado";
      }

      adicionarEmprestimo(novoEmprestimo).then(() => {
        toast.success("Empréstimo adicionado com sucesso!", {
          duration: 2000,
          position: "bottom-right",
        });
        navigate("/emprestimos");
      });
    });
  }

  useEffect(() => {
    getLivros().then((busca) => {
      setLivros(busca);
    });
  }, []);

  return (
    <div className={`${temaDark ? "bg-dark text-light" : "bg-light text-dark"} editar-emprestimo`}>
      <Container>
        <h1>Adicionar empréstimo</h1>
        <hr />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Leitor</Form.Label>
            <Form.Control
              type="text"
              className={errors.leitor && "is-invalid"}
              {...register("leitor", {
                required: "Leitor é obrigatório!",
                maxLength: { value: 255, message: "Limite de 255 caracteres!" },
              })}
            />
            <Form.Text className="invalid-feedback">
              {errors.leitor?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              className={errors.email && "is-invalid"}
              {...register("email", {
                required: "E-mail é obrigatório!",
                maxLength: { value: 255, message: "Limite de 255 caracteres!" },
              })}
            />
            <Form.Text className="invalid-feedback">
              {errors.email?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              type="tel"
              className={errors.telefone && "is-invalid"}
              {...register("telefone", {
                required: "Telefone é obrigatório!",
                maxLength: { value: 15, message: "Limite de 15 caracteres!" },
              })}
            />
            <Form.Text className="invalid-feedback">
              {errors.telefone?.message}
            </Form.Text>
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label>Livro</Form.Label>
            <Form.Select
              className={errors.idLivro && "is-invalid"}
              {...register("idLivro", { required: "Livro é obrigatório!" })}
            >
              {livros.map((livro) => (
                <option 
                key={livro.id} 
                value={livro.id}
                style={{ color: livro.status === "Atrasado" ? "red" : "black" }}
                >
                  {livro.titulo}
                </option>
              ))}
            </Form.Select>
            <Form.Text className="invalid-feedback">
              {errors.idLivro?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Data de Entrega</Form.Label>
          <Form.Control
          type="date"
          className={errors.dataEntrega && "is-invalid"}
          {...register("dataEntrega", {
          required: "Data de Entrega é obrigatória!",
               })}
              />
        <Form.Text className="invalid-feedback">
          {errors.dataEntrega?.message}
           </Form.Text>
        </Form.Group>
          <OverlayTrigger
            delay={{ hide: 450, show: 300 }}
            overlay={(props) => (
              <Tooltip {...props}>
                Ao adicionar um empréstimo, certifique-se que todos os campos
                estejam preenchidos corretamente.
              </Tooltip>
            )}
            placement="right"
          >
            <Button type="submit" variant="success">
              Emprestar
            </Button>
          </OverlayTrigger>
        </Form>
      </Container>
    </div>
  );
}
