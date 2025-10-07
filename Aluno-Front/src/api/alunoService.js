// src/api/alunoService.js
import axios from "axios";

// Cria uma instância do axios com a URL base da sua API
const apiClient = axios.create({
  baseURL: "http://localhost:8080/alunos",
  headers: {
    "Content-Type": "application/json",
  },
});

// Função para buscar todos os alunos
export const getAllAlunos = async () => {
  try {
    const response = await apiClient.get("/buscar");
    return response.data;
  } catch (error) {
    // Lança o erro para ser tratado no componente
    throw new Error(error.response?.data || "Erro ao buscar alunos");
  }
};

// Função para buscar aluno por CPF
export const getAlunoByCpf = async (cpf) => {
  try {
    const response = await apiClient.get(`/buscar?cpf=${cpf}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Erro ao buscar aluno por CPF");
  }
};

// Função para criar um novo aluno
export const createAluno = async (aluno) => {
  try {
    const response = await apiClient.post("/novo", aluno);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Erro ao criar aluno");
  }
};

// Função para atualizar um aluno
export const updateAluno = async (id, aluno) => {
  try {
    const response = await apiClient.put(`/atualizar/${id}`, aluno);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Erro ao atualizar aluno");
  }
};

// Função para deletar um aluno
export const deleteAluno = async (id) => {
  try {
    const response = await apiClient.delete(`/deletar/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Erro ao deletar aluno");
  }
};
