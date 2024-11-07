import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ICourse } from './types'; 

const CourseList: React.FC = () => {
  const [cursos, setCursos] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get<ICourse[]>('/api/curso/');
        console.log('Cursos recebidos:', response.data); 
        setCursos(response.data);
      } catch (error) {
        console.error('Error fetching cursos:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchCursos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Lista de Cursos</h1>
      {cursos.length === 0 ? (
        <p>Nenhum curso encontrado.</p>
      ) : (
        <ul>
          {cursos.map(curso => (
            <li key={curso.id}>
              <h2>{curso.nome}</h2>
              <p>{curso.descricao}</p>
              <p>Preço: R${curso.preco.toFixed(2)}</p>
              {curso.quantidades_aulas && (
                <p>Número de Aulas: {curso.quantidades_aulas}</p>
              )}
              {curso.capa_curso && (
                <img src={curso.capa_curso} alt={`Capa do curso ${curso.nome}`} style={{ maxWidth: '200px' }} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseList;
