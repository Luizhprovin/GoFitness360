import { useContext, useEffect, useState } from 'react';
import { UsuariosContext } from '../context/UsuariosContext';
import { useNavigate, useParams } from 'react-router-dom';

function CadastroExercicio() {
  const { cadastrarExercicio, exercicios, editarExercicio } = useContext(UsuariosContext);
  const [exercicio, setExercicio] = useState({ nome: '', descricao: '', tipo: '' });
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = id ? true : false;

  useEffect(() => {
    if (isEdit) {
      const exercicioEncontrado = exercicios.find(ex => ex.id === id);
      if (exercicioEncontrado) {
        setExercicio(exercicioEncontrado);
      }
    }
  }, [id, exercicios, isEdit]);

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
        onChange={(e) => setExercicio({ ...exercicio, nome: e.target.value })}
        placeholder="Nome do Exercício"
      />
      <textarea
        value={exercicio.descricao}
        onChange={(e) => setExercicio({ ...exercicio, descricao: e.target.value })}
        placeholder="Descrição"
      />
      <input
        type="text"
        value={exercicio.tipo}
        onChange={(e) => setExercicio({ ...exercicio, tipo: e.target.value })}
        placeholder="Tipo"
      />
      <button onClick={handleSave}>{isEdit ? 'Salvar Alterações' : 'Cadastrar'}</button>
    </div>
  );
}

export default CadastroExercicio;
