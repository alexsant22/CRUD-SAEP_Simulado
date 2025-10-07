package com.example.saepSimulado.service;

import com.example.saepSimulado.dto.AlunoRequest;
import com.example.saepSimulado.dto.AlunoResponse;
import com.example.saepSimulado.entity.Aluno;
import com.example.saepSimulado.repository.AlunoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlunoService {
    // Injeção do repositório de alunos
    private final AlunoRepository repository;

    // Listar todos os alunos - GET
    public List<AlunoResponse> listarTodos() {
        return repository.findAll().stream()
                .map(AlunoResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // Buscar aluno por ID - GET
    public AlunoResponse buscarPorId(Long id) {
        return repository.findById(id)
                .map(AlunoResponse::fromEntity)
                .orElse(null);
    }

    // Buscar alunos por CPF - GET
    public List<AlunoResponse> buscarPorCpf(String cpf) {
        return repository.findAllByCpf(cpf).stream()
                .map(AlunoResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // Novo aluno - POST
    public AlunoResponse novoAluno(AlunoRequest request) {
        // Verifica se já existe CPF ou email cadastrado
        if (repository.existsByCpf(request.getCpf())) {
            throw new IllegalArgumentException("CPF já cadastrado");
        }
        if (repository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        // Converte request para entidade e salva
        Aluno aluno = request.toEntity();
        Aluno salvo = repository.save(aluno);

        // Retorna response
        return AlunoResponse.fromEntity(salvo);
    }

    // Atualizar aluno - PUT
    public AlunoResponse atualizarAluno(Long id, AlunoRequest request) {
        // Busca o aluno existente
        Aluno existente = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Aluno não encontrado"));

        // Verifica se o novo CPF ou email já estão em uso por outro aluno
        if (!existente.getCpf().equals(request.getCpf()) && repository.existsByCpf(request.getCpf())) {
            throw new IllegalArgumentException("CPF já cadastrado");
        }
        if (!existente.getEmail().equals(request.getEmail()) && repository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        // Atualiza os dados do aluno existente
        existente.setNome(request.getNome());
        existente.setCpf(request.getCpf());
        existente.setEmail(request.getEmail());
        existente.setTelefone(request.getTelefone());
        existente.setTurma(request.getTurma());
        existente.setEscola(request.getEscola());

        // Salva as alterações
        Aluno atualizado = repository.save(existente);

        // Retorna response
        return AlunoResponse.fromEntity(atualizado);
    }

    // Deletar aluno - DELETE
    public boolean deletarAluno(Long id) {
        // Verifica se o aluno existe antes de deletar
        if (repository.existsById(id)) {
            // Deleta o aluno e retorna true
            repository.deleteById(id);
            return true;
        }
        // Retorna false se o aluno não existir
        return false;
    }
}
