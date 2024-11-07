import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { ILesson } from './types'; 

const ReadAula: React.FC = () => {
  const { aulaId } = useParams<{ aulaId: string }>();
  const [aula, setAula] = useState<ILesson | null>(null); 

  useEffect(() => {
    if (!aulaId) return;

    api.get<ILesson>(`/aula/${aulaId}/`) 
      .then(response => setAula(response.data))
      .catch(error => console.error('Erro ao buscar detalhes da aula:', error));
  }, [aulaId]);

  if (!aula) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>{aula.titulo}</h1>
      <p>Duração: {aula.duracao}</p>
      {aula.capa_aula && <img src={aula.capa_aula} alt="Capa da Aula" style={{ maxWidth: '200px' }} />}
      <Link to={`/aula/${aulaId}/edit`}>Editar Aula</Link>
      <Link to={`/cursos/${aula.curso}/aulas`}>Voltar para Listagem de Aulas</Link>
    </div>
  );
};

export default ReadAula;
