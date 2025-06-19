import { IAgendasResponse } from '../interface/agenda.interface';
import { MEDICO_MOCKS } from '../mocks/medicos.mock';

export class AgendaService {
  public getAgendas(): IAgendasResponse {
    return {
      medicos: MEDICO_MOCKS,
    };
  }
}
