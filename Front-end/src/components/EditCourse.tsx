import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../api'; 
import '../styles/create.css'

const EditCourse: React.FC = () => {
  const { cursoId } = useParams<{ cursoId: string }>();
  const navigate = useNavigate();

  const [nome, setNome] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [preco, setPreco] = useState<number | string>('');
  const [quantidadesAulas, setQuantidadesAulas] = useState<number | string>('');
  const [capaCurso, setCapaCurso] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string>('');

  useEffect(() => {
    if (!cursoId) return;

    api.get(`/curso/${cursoId}/`)
      .then(response => {
        const { nome, descricao, preco, quantidades_aulas, capa_curso } = response.data;
        setNome(nome);
        setDescricao(descricao);
        setPreco(preco);
        setQuantidadesAulas(quantidades_aulas);
        setCurrentImage(capa_curso); 
        setCapaCurso(null); 
      })
      .catch(error => {
        console.error('Erro ao buscar detalhes do curso:', error);
      });
  }, [cursoId]);

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

      await api.put(`/curso/${cursoId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Curso atualizado com sucesso!');
      navigate('/cursos');
    } catch (error) {
      console.error('Erro ao atualizar curso:', error);
    }
  };

  return (
    <div>
      <h1>{cursoId ? 'Editar Curso' : 'Criar Novo Curso'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {currentImage && <img src={currentImage} alt="Imagem do Curso" style={{ maxWidth: '200px', marginBottom: '10px' }} />}
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
          />
        </div>
        <button type="submit">Salvar</button>
        <Link to="/cursos">
          <button type="button">Voltar para Listagem</button>
        </Link>
      </form>
    </div>
  );
};

export default EditCourse;
