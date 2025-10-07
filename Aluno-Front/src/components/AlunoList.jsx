// src/components/AlunoList.jsx

export default function AlunoList({ alunos, onEdit, onDelete }) {
  return (
    <div>
      <h2>Lista de Alunos</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Turma</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.nome}</td>
              <td>{aluno.cpf}</td>
              <td>{aluno.email}</td>
              <td>{aluno.telefone}</td>
              <td>{aluno.turma}</td>
              <td>
                <button onClick={() => onEdit(aluno)}>Editar</button>
                <button onClick={() => onDelete(aluno.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}