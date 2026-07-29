import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { UsuariosContext } from './UsuariosContext';

const API_BASE_URL =
    import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000';

export const UsuariosContextProvider = ({ children }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [locais, setLocais] = useState([]);


    const buscarCep = async (cep) => {
      if (cep.length === 8) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();
          return { logradouro: data.logradouro, bairro: data.bairro, cidade: data.localidade, uf: data.uf };
        } catch (error) {
          console.error('Erro ao buscar dados do CEP:', error);
          return {};
        }
      }
      return {};
    };

    const fetchUsuarios = async () => {
      try {
          const response = await fetch(`${API_BASE_URL}/usuarios`);
          const data = await response.json();
          setUsuarios(data);
      } catch (error) {
          console.error('Erro ao buscar usuários:', error);
      }
    };

    const fetchLocais = async () => {
      try {
          const response = await fetch(`${API_BASE_URL}/locais`);
          const data = await response.json();
          setLocais(data);
      } catch (error) {
          console.error('Erro ao buscar locais:', error);
      }
    };

    const login = async (email, senha) => {
      try {
        const query = new URLSearchParams({ email, senha });
        const response = await fetch(`${API_BASE_URL}/usuarios?${query.toString()}`);
        const usuarios = await response.json();
        return usuarios.length > 0;
      } catch (error) {
        console.error("Erro ao realizar login:", error);
        return false;
      }
    };
    
    const cadastrarUsuario = async (usuario) => {
        try {
            const response = await fetch(`${API_BASE_URL}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });
            const data = await response.json();
    
            if (response.ok) {
                fetchUsuarios();
            } else {
                throw new Error(`Falha ao cadastrar usuário: ${data.error || 'Erro desconhecido'}`);
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
        }
    };
    
    const editarUsuario = async (id, usuario) => {
        try {
            const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });
            if (response.ok) {
                fetchUsuarios();
            } else {
                throw new Error('Falha ao editar usuário');
            }
        } catch (error) {
            console.error('Erro ao editar usuário:', error);
        }
    };

    const removerUsuario = async (id) => {
        const locaisVinculados = locais.filter(l => l.usuarioId === id);
        if (locaisVinculados.length > 0) {
            alert('Não é possível remover o usuário pois existem locais de exercícios vinculados.');
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchUsuarios();
            } else {
                throw new Error('Falha ao remover usuário');
            }
        } catch (error) {
            console.error('Erro ao remover usuário:', error);
        }
    };

    const cadastrarLocal = async (local) => {
        try {
            const response = await fetch(`${API_BASE_URL}/locais`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(local)
            });
            if (response.ok) {
                fetchLocais();
            } else {
                throw new Error('Falha ao cadastrar local');
            }
        } catch (error) {
            console.error('Erro ao cadastrar local:', error);
        }
    };

    const editarLocal = async (id, local) => {
        try {
            const response = await fetch(`${API_BASE_URL}/locais/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(local)
            });
            if (response.ok) {
                fetchLocais();
            } else {
                throw new Error('Falha ao editar local');
            }
        } catch (error) {
            console.error('Erro ao editar local:', error);
        }
    };

    const removerLocal = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/locais/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchLocais();
            } else {
                throw new Error('Falha ao remover local');
            }
        } catch (error) {
            console.error('Erro ao remover local:', error);
        }
    };

    const [exercicios, setExercicios] = useState([]);


    const fetchExercicios = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/exercicios`);
        const data = await response.json();
        setExercicios(data);
    } catch (error) {
        console.error('Erro ao buscar exercícios:', error);
    }
};

    const cadastrarExercicio = async (exercicio) => {
    try {
        const response = await fetch(`${API_BASE_URL}/exercicios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exercicio)
        });
        if (response.ok) {
            fetchExercicios();
        } else {
            throw new Error('Falha ao cadastrar exercício');
        }
    } catch (error) {
        console.error('Erro ao cadastrar exercício:', error);
    }
};

    const editarExercicio = async (id, exercicio) => {
    try {
        const response = await fetch(`${API_BASE_URL}/exercicios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exercicio)
        });
        if (response.ok) {
            fetchExercicios();
        } else {
            throw new Error('Falha ao editar exercício');
        }
    } catch (error) {
        console.error('Erro ao editar exercício:', error);
    }
};

    useEffect(() => {
        const controller = new AbortController();

        const carregarDadosIniciais = async () => {
            try {
                const responses = await Promise.all([
                    fetch(`${API_BASE_URL}/usuarios`, { signal: controller.signal }),
                    fetch(`${API_BASE_URL}/locais`, { signal: controller.signal }),
                    fetch(`${API_BASE_URL}/exercicios`, { signal: controller.signal }),
                ]);
                const [usuariosData, locaisData, exerciciosData] =
                    await Promise.all(responses.map((response) => response.json()));

                setUsuarios(usuariosData);
                setLocais(locaisData);
                setExercicios(exerciciosData);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Erro ao carregar dados iniciais:', error);
                }
            }
        };

        carregarDadosIniciais();

        return () => controller.abort();
    }, []);

    return (
        <UsuariosContext.Provider value={{
            usuarios,
            locais,
            exercicios,
            fetchExercicios,
            cadastrarExercicio,
            editarExercicio,
            fetchLocais,
            fetchUsuarios,
            login,
            buscarCep,
            cadastrarUsuario,
            editarUsuario,
            removerUsuario,
            cadastrarLocal,
            editarLocal,
            removerLocal
        }}>
            {children}
        </UsuariosContext.Provider>
    );
};

UsuariosContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};
