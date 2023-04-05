import { useEffect, useState } from "react";
import { Badge, Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { adicionarEmprestimo } from "../../firebase/emprestimos";
import { getLivro, getLivros } from "../../firebase/livros"

export function AdicionarEmprestimo() {

    const [livros, setLivros] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const [dataEntrega, setDataEntrega] = useState(new Date());

    function onSubmit(data) {
        getLivro(data.idLivro).then(livro => {
            delete data.idLivro;
            let novoEmprestimo = {...data, status: "Pendente", livro, dataEmprestimo: new Date()};
            adicionarEmprestimo(novoEmprestimo).then(() => {
                toast.success("Empréstimo adicionado com sucesso!", { duration: 2000, position: "bottom-right" })
                navigate("/emprestimos");
            })
        })

    }


    useEffect(() => {
        getLivros().then(busca => {
            setLivros(busca);
        });
    }, [])


    return (
        <div className="adicionar-emprestimo">
            <Container>
                <h1>Adicionar empréstimo</h1>
                <hr />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Leitor</Form.Label>
                        <Form.Control type="text" className={errors.leitor && "is-invalid"} {...register("leitor", { required: "Leitor é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
                        <Form.Text className="invalid-feedback">
                            {errors.leitor?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" className={errors.email && "is-invalid"} {...register("email", { required: "E-mail é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
                        <Form.Text className="invalid-feedback">
                            {errors.email?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control type="tel" className={errors.telefone && "is-invalid"} {...register("telefone", { required: "Telefone é obrigatório!", maxLength: { value: 15, message: "Limite de 15 caracteres!" } })} />
                        <Form.Text className="invalid-feedback">
                            {errors.telefone?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
    <Form.Label>Livro</Form.Label>
    <Form.Select className={errors.idLivro && "is-invalid"} {...register("idLivro", { required: "Livro é obrigatório!" })}>
    {livros.map(livro => (
        <option 
            key={livro.id} 
            value={livro.id} 
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
                        <Form.Label>Data da Entrega</Form.Label>
                        <Form.Control type="date" value={dataEntrega.toISOString().substr(0, 10)} onChange={(event) => setDataEntrega(new Date(event.target.value))} />
                        </Form.Group>
                    <Button type="submit" variant="success">Emprestar</Button>
                </Form>
            </Container>
        </div>
    );

    function onSubmit(data) {
        const dataAtual = new Date();
        const dataEntrega = new Date(data.dataEntrega);

        if (dataEntrega <= dataAtual) {
            data.status = "Pendente"
            console.log(dataEntrega)
        } else {
            data.status = "Atrasado"
        }
          
        getLivro(data.idLivro).then(livro => {
            delete data.idLivro;
            let novoEmprestimo = {...data, livro, dataEmprestimo: new Date()};
            adicionarEmprestimo(novoEmprestimo).then(() => {
                toast.success("Empréstimo adicionado com sucesso!", { duration: 2000, position: "bottom-right" })
                navigate("/emprestimos");
            })
        })
    
        let novoEmprestimo = {...data, livros, dataEmprestimo: new Date(), dataEntrega: dataEntrega};
    }
}