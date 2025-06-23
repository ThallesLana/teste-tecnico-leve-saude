import { MEDICO_MOCKS } from '../../mocks/medicos.mock';
import { AgendaService } from '../agendaService';

describe('AgendaService', () => {
  let agendaService: AgendaService;

  beforeEach(() => {
    agendaService = new AgendaService();
  });

  it('should return a list of return with their available schedules', () => {
    const result = agendaService.getAgendas();

    expect(result).toBeDefined();
    expect(result.medicos).toEqual(MEDICO_MOCKS);
    expect(result.medicos.length).toBeGreaterThan(0);
    expect(result.medicos[0]).toHaveProperty('id');
    expect(result.medicos[0]).toHaveProperty('nome');
    expect(result.medicos[0]).toHaveProperty('especialidade');
    expect(result.medicos[0]).toHaveProperty('horarios_disponiveis');
  });
});
