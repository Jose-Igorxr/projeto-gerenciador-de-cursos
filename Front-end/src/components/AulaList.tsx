import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

const AulaList: React.FC = () => {
  const { cursoId } = useParams<{ cursoId: string }>();
  const [aulas, setAulas] = useState<any[]>([]);

  useEffect(() => {
    if (!cursoId) return;

    api.get(`/aula/?curso=${cursoId}`)
      .then(response => setAulas(response.data))
      .catch(error => console.error('Erro ao buscar aulas:', error));
  }, [cursoId]);

  return (
    <div>
      <h1>Aulas do Curso</h1>
      <Link to={`/aulas/create?curso=${cursoId}`}>Criar Nova Aula</Link>
      <ul>
        {aulas.map(aula => (
          <li key={aula.id}>
            <Link to={`/aula/${aula.id}/detail`}>{aula.titulo}</Link>
          </li>
        ))}
      </ul>
      <Link to={`/cursos/${cursoId}`}>Voltar para Detalhes do Curso</Link>
    </div>
  );
};

export default AulaList;
