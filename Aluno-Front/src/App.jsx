// src/App.jsx
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AlunoListagem from './pages/AlunoListagem';
import AlunoCadastro from './pages/AlunoCadastro';
import AlunoEditar from './pages/AlunoEditar';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link> | <Link to="/alunos">Listagem de Alunos</Link> |{' '}
        <Link to="/alunos/novo">Cadastrar Aluno</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alunos" element={<AlunoListagem />} />
        <Route path="/alunos/novo" element={<AlunoCadastro />} />
        <Route path="/alunos/editar/:id" element={<AlunoEditar />} />
      </Routes>
    </div>
  );
}

export default App;