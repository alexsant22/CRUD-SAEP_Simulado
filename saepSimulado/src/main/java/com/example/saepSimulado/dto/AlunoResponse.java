package com.example.saepSimulado.dto;

import com.example.saepSimulado.entity.Aluno;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlunoResponse {
    private Long id;
    private String nome;
    private String cpf;
    private String email;
    private String telefone;
    private String turma;
    private String escola;

    // Metodo para criar response a partir da entidade Aluno
    public static AlunoResponse fromEntity(Aluno aluno) {
        return new AlunoResponse(
                aluno.getId(),
                aluno.getNome(),
                aluno.getCpf(),
                aluno.getEmail(),
                aluno.getTelefone(),
                aluno.getTurma(),
                aluno.getEscola()
        );
    }
}
