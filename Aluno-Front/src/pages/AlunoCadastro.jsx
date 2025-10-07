// src/pages/AlunoCadastro.jsx
import { useNavigate } from 'react-router-dom';
import AlunoForm from '../components/AlunoForm';
import * as alunoService from '../api/alunoService';

export default function AlunoCadastro() {
  const navigate = useNavigate();

  const handleSave = async (aluno) => {
    try {
      await alunoService.createAluno(aluno);
      navigate('/alunos'); // Redireciona para a lista após salvar
    } catch (error) {
      alert(error.message); // Exibe o erro do backend
    }
  };

  return (
    <div>
      <AlunoForm onSave={handleSave} />
    </div>
  );
}