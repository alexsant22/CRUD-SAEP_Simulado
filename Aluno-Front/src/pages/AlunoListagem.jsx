// src/pages/AlunoListagem.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AlunoList from '../components/AlunoList';
import * as alunoService from '../api/alunoService';

export default function AlunoListagem() {
  const [alunos, setAlunos] = useState([]);
  const navigate = useNavigate();

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

  const handleEdit = (aluno) => {
    navigate(`/alunos/editar/${aluno.id}`);
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
      <AlunoList alunos={alunos} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}