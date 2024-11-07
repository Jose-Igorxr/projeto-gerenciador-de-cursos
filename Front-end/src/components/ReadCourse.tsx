import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { ICourse } from './types'; 

const ReadCourse: React.FC = () => {
  const { cursoId } = useParams<{ cursoId: string }>();
  const [course, setCourse] = useState<ICourse | null>(null); 

  useEffect(() => {
    if (!cursoId) return;

    api.get<ICourse>(`/curso/${cursoId}/`) 
      .then(response => setCourse(response.data))
      .catch(error => console.error('Erro ao buscar detalhes do curso:', error));
  }, [cursoId]);

  if (!course) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>{course.nome}</h1>
      <p>{course.descricao}</p>
      <p>Preço: {course.preco}</p>
      <p>Quantidade de Aulas: {course.quantidades_aulas}</p>
      {course.capa_curso && <img src={course.capa_curso} alt="Capa do Curso" style={{ maxWidth: '200px' }} />}
      <Link to={`/cursos/${cursoId}/edit`}>Editar Curso</Link>
      <Link to="/cursos">Voltar para Listagem</Link>
    </div>
  );
};

export default ReadCourse;
