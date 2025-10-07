// src/pages/AlunoEditar.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AlunoForm from '../components/AlunoForm';
import * as alunoService from '../api/alunoService';

export default function AlunoEditar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aluno, setAluno] = useState(null);

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        // Você precisará de uma função no seu serviço para buscar por ID
        // Vamos assumir que ela existe por enquanto.
        // Adicione a seguinte função em alunoService.js
        /*
        export const getAlunoById = async (id) => {
          try {
            const response = await apiClient.get(`/buscar/${id}`);
            return response.data;
          } catch (error) {
            throw new Error(error.response?.data || "Erro ao buscar aluno por ID");
          }
        };
        */
        const data = await alunoService.getAlunoById(id);
        setAluno(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAluno();
  }, [id]);

  const handleSave = async (aluno) => {
    try {
      await alunoService.updateAluno(id, aluno);
      navigate('/alunos');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>{aluno ? <AlunoForm onSave={handleSave} alunoToEdit={aluno} /> : <p>Carregando...</p>}</div>
  );
}