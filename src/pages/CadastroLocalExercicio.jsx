import { useContext, useState } from 'react';
import { useLocation } from 'wouter';
import { UsuariosContext } from '../context/UsuariosContext';
import './CadastroLocalExercicio.css'; 

function CadastroLocalExercicio() {
  const { cadastrarLocal } = useContext(UsuariosContext);
  const [local, setLocal] = useState({
    nome: "",
    descricao: "",
    cep: "",
    endereco: "",
    tiposDePraticasEsportivas: []
  });
  const [, navigate] = useLocation();

  const buscarCep = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      setLocal(prevState => ({
        ...prevState,
        endereco: `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`
      }));
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocal(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'cep' && value.length === 8) {
      buscarCep(value);
    }
  };

  const handleSave = async () => {
    await cadastrarLocal(local);
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Cadastro de Local de Exercício</h1>
      <input
        type="text"
        name="nome"
        value={local.nome}
        placeholder="Nome do Local"
        onChange={handleChange}
      />
      <textarea
        name="descricao"
        value={local.descricao}
        placeholder="Descrição do Local"
        onChange={handleChange}
      />
      <input
        type="text"
        name="cep"
        value={local.cep}
        placeholder="CEP"
        onChange={handleChange}
      />
      <input
        type="text"
        name="endereco"
        value={local.endereco}
        placeholder="Endereço"
        readOnly
      />
      <button onClick={handleSave}>Cadastrar Local</button>
    </div>
  );
}

export default CadastroLocalExercicio;
