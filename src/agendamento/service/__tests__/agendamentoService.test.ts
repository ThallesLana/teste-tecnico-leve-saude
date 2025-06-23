import { IAgendamentoPayload, IAgendamentoResponse } from '../../interface/agendamento.interface';
import { AgendamentoService } from '../agendamentoService';

describe('AgendamentoService', () => {
  let agendamentoService: AgendamentoService;

  beforeEach(() => {
    agendamentoService = new AgendamentoService();
  });

  it('should successfully create an appointment with valid data', () => {
    const payload: IAgendamentoPayload = {
      medico: 'Dr. João Silva',
      paciente: 'Carlos Rodrigo',
      data_horario: '2025-05-10 09:00',
    };

    const expectedResponse: IAgendamentoResponse = {
      mensagem: 'Agendamento realizado com sucesso',
      agendamento: payload,
    };

    const result = agendamentoService.createAgendamento(payload);

    expect(result).toBeDefined();
    expect(result).toEqual(expectedResponse);
    expect(result.agendamento).toEqual(payload);
    expect(result.mensagem).toBe('Agendamento realizado com sucesso');
  });
});
