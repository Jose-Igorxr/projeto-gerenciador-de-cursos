import { useEffect, useState } from 'react';
import api from '../api';
import { IStudent } from './types'; 

const EstudanteList: React.FC = () => {
  const [estudantes, setEstudantes] = useState<IStudent[]>([]); 

  useEffect(() => {
    api.get<IStudent[]>('/estudante/') 
      .then(response => setEstudantes(response.data))
      .catch(error => console.error('Erro ao buscar estudantes:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Estudantes</h1>
      <ul>
        {estudantes.map(estudante => (
          <li key={estudante.id}>
            {estudante.nome_estudante} {}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EstudanteList;
