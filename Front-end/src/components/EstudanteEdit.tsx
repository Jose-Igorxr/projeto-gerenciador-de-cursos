import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import '../styles/create.css'

const EditEstudante: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [nomeEstudante, setNomeEstudante] = useState<string>('');
  const [idadeEstudante, setIdadeEstudante] = useState<number | string>('');
  const [fotoEstudante, setFotoEstudante] = useState<File | null>(null);
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchEstudante = async () => {
      try {
        const response = await api.get(`/api/estudante/${id}/`);
        const estudante = response.data;
        setNomeEstudante(estudante.nome_estudante);
        setIdadeEstudante(estudante.idade_estudante);
        setFotoUrl(estudante.foto_estudante);
      } catch (error) {
        console.error('Erro ao carregar estudante:', error);
      }
    };

    if (id) {
      fetchEstudante();
    }
  }, [id]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFotoEstudante(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nome_estudante', nomeEstudante);
      formData.append('idade_estudante', String(idadeEstudante));

      if (fotoEstudante) {
        formData.append('foto_estudante', fotoEstudante);
      }

      await api.put(`/api/estudante/${id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Estudante editado com sucesso!');
      navigate('/estudantes');
    } catch (error) {
      console.error('Erro ao editar estudante:', error);
    }
  };

  return (
    <div>
      <h1>Editar Estudante</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do Estudante"
          value={nomeEstudante}
          onChange={(e) => setNomeEstudante(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Idade do Estudante"
          value={idadeEstudante}
          onChange={(e) => setIdadeEstudante(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {fotoUrl && <img src={fotoUrl} alt="Foto atual" style={{ maxWidth: '100px' }} />}
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditEstudante;
