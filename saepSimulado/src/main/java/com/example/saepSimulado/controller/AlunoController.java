package com.example.saepSimulado.controller;

import com.example.saepSimulado.dto.AlunoRequest;
import com.example.saepSimulado.dto.AlunoResponse;
import com.example.saepSimulado.service.AlunoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alunos")
@RequiredArgsConstructor
public class AlunoController {
    // Injeção do serviço de alunos
    private final AlunoService service;

    // Listar todos os alunos - GET
    @GetMapping("/buscar")
    public ResponseEntity<List<AlunoResponse>> buscarAlunos(
            @RequestParam(required = false) String cpf) {
        // Lista para armazenar os responses
        List<AlunoResponse> responses;

        // Se CPF for fornecido, busca por CPF, senão lista todos
        if (cpf != null && !cpf.isEmpty()) {
            // Busca alunos por CPF usando o service
            responses = service.buscarPorCpf(cpf);
        } else {
            // Busca todos os alunos usando o service
            responses = service.listarTodos();
        }
        // Retorna a lista de responses
        return ResponseEntity.ok(responses);
    }

    // Buscar aluno por ID - GET
    @GetMapping("/buscar/{id}")
    public ResponseEntity<AlunoResponse> buscarPorId(@PathVariable Long id) {
        AlunoResponse response = service.buscarPorId(id);
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Novo aluno - POST
    @PostMapping("/novo")
    public ResponseEntity<AlunoResponse> novoAluno(@Valid @RequestBody AlunoRequest request) {
        AlunoResponse response = service.novoAluno(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    // Atualizar aluno - PUT
    @PutMapping("/atualizar/{id}")
    public ResponseEntity<AlunoResponse> atualizarAluno(
            @PathVariable Long id,
            @Valid @RequestBody AlunoRequest request) {
        AlunoResponse response = service.atualizarAluno(id, request);
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    // Deletar aluno - DELETE
    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarAluno(@PathVariable Long id) {
        boolean deletado = service.deletarAluno(id);
        if (deletado) {
            return ResponseEntity.ok("Aluno deletado com sucesso");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aluno não encontrado");
        }
    }
}
