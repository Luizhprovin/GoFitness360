import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'wouter';
import { UsuariosContext } from '../context/UsuariosContext';

function EditarLocal({ id }) {
    const [, navigate] = useLocation();
    const { locais, editarLocal } = useContext(UsuariosContext);
    const [rascunho, setRascunho] = useState(null);
    const local = locais.find((item) => String(item.id) === id);
    const formData = rascunho ?? {
        nome: local?.nome ?? '',
        descricao: local?.descricao ?? '',
        coordenadas: local?.coordenadas ?? '',
        tipoDePratica: local?.tipoDePratica ?? '',
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRascunho({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await editarLocal(id, formData);
        alert('Local atualizado com sucesso!');
        navigate('/');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
            <h1 style={{ textAlign: 'center' }}>Editar Local de Exercício</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    type="text"
                    placeholder='Digite aqui o local'
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    style={{ padding: '10px', fontSize: '16px' }}
                />
                <textarea
                    name="descricao"
                    placeholder='Descreva como é o local'
                    value={formData.descricao}
                    onChange={handleChange}
                    required
                    style={{ padding: '10px', height: '100px', fontSize: '16px' }}
                />
                <input
                    type="text"
                    placeholder='Digite aqui as coordenadas do local'
                    name="coordenadas"
                    value={formData.coordenadas}
                    onChange={handleChange}
                    style={{ padding: '10px', fontSize: '16px' }}
                />
                <input
                    type="text"
                    placeholder='Digite aqui qual o tipo do esporte'
                    name="tipoDePratica"
                    value={formData.tipoDePratica}
                    onChange={handleChange}
                    style={{ padding: '10px', fontSize: '16px' }}
                />
                
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', fontSize: '16px', cursor: 'pointer' }}>Salvar Alterações</button>
                <button type="button" onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '10px 10px', backgroundColor: '#f44336', color: 'white', fontSize: '16px', cursor: 'pointer' }}>Cancelar</button>
                </form>
        </div>
       
    );
}

EditarLocal.propTypes = {
    id: PropTypes.string.isRequired,
};

export default EditarLocal;
