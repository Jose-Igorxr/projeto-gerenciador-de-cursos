import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom'; 
import api from '../api';
import '../styles/create.css'

const CreateAula: React.FC = () => {
  const [searchParams] = useSearchParams();
  const cursoId = searchParams.get('curso');
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState<string>('');
  const [duracao, setDuracao] = useState<number | string>('');
  const [capaAula, setCapaAula] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCapaAula(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('curso', cursoId || '');
      formData.append('titulo', titulo);
      formData.append('duracao', String(duracao));

      if (capaAula) {
        formData.append('capa_aula', capaAula);
      }

      await api.post('/aula/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Aula criada com sucesso!');
      navigate(`/cursos/${cursoId}/aulas`);
    } catch (error) {
      console.error('Erro ao criar aula:', error);
    }
  };

  return (
    <div>
      <h1>Criar Nova Aula</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título da Aula"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Duração"
          value={duracao}
          onChange={(e) => setDuracao(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button type="submit">Criar</button>
        <Link to={`/cursos/${cursoId}/aulas`}>Voltar para Listagem de Aulas</Link>
      </form>
    </div>
  );
};

export default CreateAula;
