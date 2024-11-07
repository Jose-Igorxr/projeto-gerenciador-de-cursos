import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/create.css'



const CreateEstudante: React.FC = () => {
  const navigate = useNavigate();
  const [nomeEstudante, setNomeEstudante] = useState<string>('');
  const [idadeEstudante, setIdadeEstudante] = useState<number | string>('');
  const [fotoEstudante, setFotoEstudante] = useState<File | null>(null);

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

      await api.post('/estudante/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      

      alert('Estudante criado com sucesso!');
      navigate('/estudantes');
    } catch (error) {
      console.error('Erro ao criar estudante:', error);
    }
  };

  return (
    <div>
      <h1>Criar Novo Estudante</h1>
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
        <button type="submit">Criar</button>
      </form>
    </div>
  );
};

export default CreateEstudante;
