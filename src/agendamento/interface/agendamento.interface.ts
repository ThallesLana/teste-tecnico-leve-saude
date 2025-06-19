export interface IAgendamentoPayload {
  medico: string;
  paciente: string;
  data_horario: string;
}

export interface IAgendamentoResponse {
  mensagem: string;
  agendamento: IAgendamentoPayload;
}
