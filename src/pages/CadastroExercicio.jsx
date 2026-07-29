import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'wouter';
import { UsuariosContext } from '../context/UsuariosContext';

function CadastroExercicio({ id }) {
  const { cadastrarExercicio, exercicios, editarExercicio } = useContext(UsuariosContext);
  const [rascunho, setRascunho] = useState(null);
  const [, navigate] = useLocation();
  const isEdit = Boolean(id);
  const exercicioEncontrado = isEdit
    ? exercicios.find((item) => String(item.id) === id)
    : null;
  const exercicio = rascunho ?? exercicioEncontrado ?? {
    nome: '',
    descricao: '',
    tipo: '',
  };

  const handleSave = async () => {
    if (isEdit) {
      await editarExercicio(id, exercicio);
    } else {
      await cadastrarExercicio(exercicio);
    }
    navigate('/');
  };

  return (
    <div>
      <h1>{isEdit ? 'Editar Exercício' : 'Cadastrar Exercício'}</h1>
      <input
        type="text"
        value={exercicio.nome}
        onChange={(e) => setRascunho({ ...exercicio, nome: e.target.value })}
        placeholder="Nome do Exercício"
      />
      <textarea
        value={exercicio.descricao}
        onChange={(e) => setRascunho({ ...exercicio, descricao: e.target.value })}
        placeholder="Descrição"
      />
      <input
        type="text"
        value={exercicio.tipo}
        onChange={(e) => setRascunho({ ...exercicio, tipo: e.target.value })}
        placeholder="Tipo"
      />
      <button onClick={handleSave}>{isEdit ? 'Salvar Alterações' : 'Cadastrar'}</button>
    </div>
  );
}

CadastroExercicio.propTypes = {
  id: PropTypes.string,
};

export default CadastroExercicio;
