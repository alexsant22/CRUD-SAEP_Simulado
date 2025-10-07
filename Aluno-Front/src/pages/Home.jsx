// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import AlunoList from '../components/AlunoList';
import AlunoForm from '../components/AlunoForm';
import * as alunoService from '../api/alunoService';

export default function Home() {
  const [alunos, setAlunos] = useState([]);
  const [alunoToEdit, setAlunoToEdit] = useState(null);

  const fetchAlunos = async () => {
    try {
      const data = await alunoService.getAllAlunos();
      setAlunos(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  const handleSave = async (aluno) => {
    try {
      if (aluno.id) {
        await alunoService.updateAluno(aluno.id, aluno);
      } else {
        await alunoService.createAluno(aluno);
      }
      setAlunoToEdit(null); // Limpa o formulário
      fetchAlunos(); // Atualiza a lista
    } catch (error) {
        alert(error.message); // Exibe o erro do backend
    }
  };

  const handleEdit = (aluno) => {
    setAlunoToEdit(aluno);
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm('Tem certeza que deseja deletar este aluno?')) {
        await alunoService.deleteAluno(id);
        fetchAlunos(); // Atualiza a lista
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>Gerenciamento de Alunos</h1>
      <AlunoForm onSave={handleSave} alunoToEdit={alunoToEdit} />
      <AlunoList alunos={alunos} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}