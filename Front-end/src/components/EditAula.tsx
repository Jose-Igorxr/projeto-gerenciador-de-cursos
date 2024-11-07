import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';
import '../styles/create.css'

const EditAula: React.FC = () => {
  const { aulaId } = useParams<{ aulaId: string }>();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState<string>('');
  const [duracao, setDuracao] = useState<number | string>('');
  const [capaAula, setCapaAula] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string>('');

  useEffect(() => {
    if (!aulaId) return;

    api.get(`/aula/${aulaId}/`)
      .then(response => {
        const { titulo, duracao, capa_aula } = response.data;
        setTitulo(titulo);
        setDuracao(duracao);
        setCurrentImage(capa_aula);
      })
      .catch(error => console.error('Erro ao buscar detalhes da aula:', error));
  }, [aulaId]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCapaAula(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('duracao', String(duracao));

      if (capaAula) {
        formData.append('capa_aula', capaAula);
      }

      await api.put(`/aula/${aulaId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Aula atualizada com sucesso!');
      navigate(`/aula/${aulaId}/detail`);
    } catch (error) {
      console.error('Erro ao atualizar aula:', error);
    }
  };

  return (
    <div>
      <h1>Editar Aula</h1>
      <form onSubmit={handleSubmit}>
        {currentImage && <img src={currentImage} alt="Capa da Aula" style={{ maxWidth: '200px', marginBottom: '10px' }} />}
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
        <button type="submit">Salvar</button>
        <Link to={`/aula/${aulaId}/detail`}>Voltar para Detalhes da Aula</Link>
      </form>
    </div>
  );
};

export default EditAula;
