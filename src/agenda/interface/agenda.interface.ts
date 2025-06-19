export interface IMedico {
  id: number;
  nome: string;
  especialidade: string;
  horarios_disponiveis: string[];
}

export interface IAgendasResponse {
  medicos: IMedico[];
}
