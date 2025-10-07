package com.example.saepSimulado.dto;

import com.example.saepSimulado.entity.Aluno;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlunoRequest {
    @NotBlank(message = "O nome é obrigatório")
    @Size(max = 100, message = "O nome deve ter no máximo 100 caracteres")
    private String nome;

    @NotBlank(message = "O CPF é obrigatório")
    @Pattern(regexp = "^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$", message = "CPF deve estar no formato 000.000.000-00")
    private String cpf;

    @NotBlank(message = "O email é obrigatório")
    @Email(message = "Email deve ser válido")
    @Size(max = 100, message = "O email deve ter no máximo 100 caracteres")
    private String email;

    @NotBlank(message = "O telefone é obrigatório")
    @Size(max = 15, message = "O telefone deve ter no máximo 15 caracteres")
    private String telefone;

    @NotBlank(message = "A turma é obrigatória")
    @Size(max = 50, message = "A turma deve ter no máximo 50 caracteres")
    private String turma;

    @NotBlank(message = "A escola é obrigatória")
    @Size(max = 100, message = "A escola deve ter no máximo 100 caracteres")
    private String escola;

    // Metodo para conerter para Entity
    public Aluno toEntity() {
        Aluno aluno = new Aluno();

        aluno.setNome(this.nome);
        aluno.setCpf(this.cpf);
        aluno.setEmail(this.email);
        aluno.setTelefone(this.telefone);
        aluno.setTurma(this.turma);
        aluno.setEscola(this.escola);

        return aluno;
    }
}
