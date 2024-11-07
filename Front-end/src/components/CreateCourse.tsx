import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api'; 


const CreateCourse: React.FC = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [preco, setPreco] = useState<number | string>('');
  const [quantidadesAulas, setQuantidadesAulas] = useState<number | string>('');
  const [capaCurso, setCapaCurso] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCapaCurso(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('descricao', descricao);
      formData.append('preco', String(preco));
      formData.append('quantidades_aulas', String(quantidadesAulas));

      if (capaCurso) {
        formData.append('capa_curso', capaCurso);
      }

      await api.post('/curso/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Curso criado com sucesso!');
      navigate('/cursos');
    } catch (error) {
      console.error('Erro ao criar curso:', error);
    }
  };

  return (
    <div>
      <h1>Criar Novo Curso</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Nome do Curso"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Descrição do Curso"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Preço"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Quantidade de Aulas"
            value={quantidadesAulas}
            onChange={(e) => setQuantidadesAulas(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">Criar</button>
        <Link to="/cursos">
          <button type="button">Voltar para Listagem</button>
        </Link>
      </form>
    </div>
  );
};

export default CreateCourse;
