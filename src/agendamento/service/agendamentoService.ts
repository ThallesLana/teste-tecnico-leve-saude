import { IAgendamentoPayload, IAgendamentoResponse } from '../interface/agendamento.interface';

export class AgendamentoService {
  public createAgendamento(payload: IAgendamentoPayload): IAgendamentoResponse {
    return {
      mensagem: 'Agendamento realizado com sucesso',
      agendamento: payload,
    };
  }
}
