// src/components/AlunoForm.jsx
import { useState, useEffect } from 'react';

export default function AlunoForm({ onSave, alunoToEdit }) {
  const [aluno, setAluno] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    turma: '',
    escola: '',
  });

  useEffect(() => {
    if (alunoToEdit) {
      setAluno(alunoToEdit);
    } else {
      // Limpa o formulário se não houver aluno para editar
      setAluno({ nome: '', cpf: '', email: '', telefone: '', turma: '', escola: '' });
    }
  }, [alunoToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAluno((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(aluno);
    // Limpa o formulário após salvar
    setAluno({ nome: '', cpf: '', email: '', telefone: '', turma: '', escola: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{aluno.id ? 'Editar Aluno' : 'Novo Aluno'}</h2>
      <input name="nome" value={aluno.nome} onChange={handleChange} placeholder="Nome" required />
      <input name="cpf" value={aluno.cpf} onChange={handleChange} placeholder="CPF (000.000.000-00)" required />
      <input name="email" value={aluno.email} onChange={handleChange} placeholder="Email" type="email" required />
      <input name="telefone" value={aluno.telefone} onChange={handleChange} placeholder="Telefone" required />
      <input name="turma" value={aluno.turma} onChange={handleChange} placeholder="Turma" required />
      <input name="escola" value={aluno.escola} onChange={handleChange} placeholder="Escola" required />
      <button type="submit">Salvar</button>
    </form>
  );
}