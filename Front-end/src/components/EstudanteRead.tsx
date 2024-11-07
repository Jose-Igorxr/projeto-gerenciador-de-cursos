import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

interface IEstudante {
  id: number;
  nome_estudante: string;
  idade_estudante: number;
  foto_estudante: string | null;
}

const ReadEstudante: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [estudante, setEstudante] = useState<IEstudante | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEstudante = async () => {
      try {
        const response = await api.get<IEstudante>(`/api/estudante/${id}/`);
        setEstudante(response.data);
      } catch (error) {
        console.error('Erro ao buscar estudante:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEstudante();
    }
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!estudante) {
    return <div>Estudante não encontrado.</div>;
  }

  return (
    <div>
      <h1>Detalhes do Estudante</h1>
      <div>
        <h2>{estudante.nome_estudante}</h2>
        <p><strong>Idade:</strong> {estudante.idade_estudante}</p>
        {estudante.foto_estudante && (
          <img
            src={estudante.foto_estudante}
            alt={`Foto de ${estudante.nome_estudante}`}
            style={{ maxWidth: '200px', maxHeight: '200px' }}
          />
        )}
      </div>
      <div>
        <Link to="/estudantes">Voltar para a lista de estudantes</Link>
      </div>
    </div>
  );
};

export default ReadEstudante;
