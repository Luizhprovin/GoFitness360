import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsuariosContext } from '../context/UsuariosContext';
import './CadastroUsuarios.css'; 

function CadastroUsuarios() {
    const { cadastrarUsuario } = useContext(UsuariosContext);
    const navigate = useNavigate();
    const [novoUsuario, setNovoUsuario] = useState({
        nome: "",
        email: "",
        senha: "",
        cep: "",
        logradouro: "",
        bairro: "",
        cidade: "",
        estado: ""
    });
    const [feedback, setFeedback] = useState("");

    const buscarCep = async (cep) => {
        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                setNovoUsuario(prevState => ({
                    ...prevState,
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    estado: data.uf
                }));
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
            }
        }
    };

    const handleCepChange = (event) => {
        const cep = event.target.value;
        setNovoUsuario(prevState => ({ ...prevState, cep }));

        if (cep.length === 8) {
            buscarCep(cep);
        }
    };

    const handleCadastro = async (e) => {
        e.preventDefault(); 
        if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.senha) {
            setFeedback("Todos os campos são obrigatórios.");
            return;
        }
        try {
            await cadastrarUsuario(novoUsuario);
            setFeedback("Usuário cadastrado com sucesso!");
            navigate('/login'); 
        } catch (error) {
            setFeedback("Erro ao cadastrar usuário: " + error.message);
        }
    };

    return (
        <div className="cadastro-container">
            <form className="cadastro-form" onSubmit={handleCadastro}>
                <h1>Cadastro de usuário</h1>
                <input
                    type="text"
                    className="cadastro-input"
                    value={novoUsuario.nome}
                    placeholder="Digite o nome do usuário"
                    onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
                />
                <input
                    type="email"
                    className="cadastro-input"
                    value={novoUsuario.email}
                    placeholder="Digite o email do usuário"
                    onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
                />
                <input
                    type="password"
                    className="cadastro-input"
                    value={novoUsuario.senha}
                    placeholder="Digite a senha do usuário"
                    onChange={(e) => setNovoUsuario({ ...novoUsuario, senha: e.target.value })}
                />
                <input
                    type="text"
                    className="cadastro-input"
                    value={novoUsuario.cep}
                    placeholder="Digite o CEP"
                    onChange={handleCepChange}
                />
                <input
                    type="text"
                    className="cadastro-input"
                    value={novoUsuario.logradouro}
                    placeholder="Logradouro"
                    readOnly
                />
                <input
                    type="text"
                    className="cadastro-input"
                    value={novoUsuario.bairro}
                    placeholder="Bairro"
                    readOnly
                />
                <input
                    type="text"
                    className="cadastro-input"
                    value={novoUsuario.cidade}
                    placeholder="Cidade"
                    readOnly
                />
                <input
                    type="text"
                    className="cadastro-input"
                    value={novoUsuario.estado}
                    placeholder="Estado"
                    readOnly
                />
                <button type="submit" className="cadastro-button">Cadastrar</button>
                {feedback && <p>{feedback}</p>}
            </form>
        </div>
    );
}

export default CadastroUsuarios;
