import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import CourseList from './components/CourseList'; 
import CreateCourse from './components/CreateCourse'; 
import EditCourse from './components/EditCourse'; 
import ReadCourse from './components/ReadCourse'; 
import AulaList from './components/AulaList'; 
import CreateAula from './components/CreateAula'; 
import EditAula from './components/EditAula'; 
import ReadAula from './components/ReadAula'; 
import EstudanteList from './components/EstudanteList'; 
import EstudanteCreate from './components/EstudanteCreate'; 
import EstudanteEdit from './components/EstudanteEdit'; 
import EstudanteRead from './components/EstudanteRead'; 

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/cursos" element={<CourseList />} />
          <Route path="/cursos/create" element={<CreateCourse />} />
          <Route path="/cursos/:cursoId/edit" element={<EditCourse />} />
          <Route path="/cursos/:cursoId/detail" element={<ReadCourse />} />
          
          <Route path="/aulas" element={<AulaList />} />
          <Route path="/aulas/create" element={<CreateAula />} />
          <Route path="/aulas/:aulaId/edit" element={<EditAula />} />
          <Route path="/aulas/:aulaId/detail" element={<ReadAula />} />
          
          <Route path="/estudantes" element={<EstudanteList />} />
          <Route path="/estudantes/create" element={<EstudanteCreate />} />
          <Route path="/estudantes/:estudantesId/edit" element={<EstudanteEdit />} />
          <Route path="/estudantes/:estudantesId/detail" element={<EstudanteRead />} />
          {}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
