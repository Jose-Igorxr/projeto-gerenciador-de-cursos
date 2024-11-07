// Define the interface for a Course (Curso)
export interface ICourse {
  id: number; // Assuming there's an ID for the course
  nome: string; // Course name
  descricao: string; // Course description
  preco: number; // Course price
  quantidades_aulas: number | null; // Number of classes (can be null)
  capa_curso?: string; // Optional course cover image URL
  created_at?: string; // Optional creation date
  updated_at?: string; // Optional update date
}

// Define the interface for a Lesson (Aula)
export interface ILesson {
  id: number; // Assuming there's an ID for the lesson
  curso: number; // Course ID this lesson belongs to
  titulo: string; // Lesson title
  duracao: number | null; // Duration (can be null)
  capa_aula?: string; // Optional lesson cover image URL
  created_at?: string; // Optional creation date
  updated_at?: string; // Optional update date
}

// Define the interface for a Student (Estudante)
export interface IStudent {
  id: number; // Assuming there's an ID for the student
  usuario: number; // User ID for the related user
  cursos: number[]; // Array of Course IDs the student is enrolled in
  nome_estudante?: string; // Optional student name
  idade_estudante?: number; // Optional student age
  foto_estudante?: string; // Optional student photo URL
  created_at?: string; // Optional creation date
  updated_at?: string; // Optional update date
}

// Define the interface for a Post if needed
export interface IPost {
  title: string; // Title of the post
  content: string; // Content of the post
  image: string; // Image URL of the post
}
