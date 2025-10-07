package com.example.saepSimulado.repository;

import com.example.saepSimulado.entity.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    // Verifica se já existe CPF ou email cadastrado
    boolean existsByCpf(String cpf);
    boolean existsByEmail(String email);

    // Buscar por CPF
    Optional<Aluno> findByCpf(String cpf);
    List<Aluno> findAllByCpf(String cpf);
}
