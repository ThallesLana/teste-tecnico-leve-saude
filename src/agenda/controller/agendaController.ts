import { APIGatewayProxyResult } from 'aws-lambda';
import { AgendaService } from '../service/agendaService';
import { formatApiResponse } from '../../utils/formatApiResponse';

export const getAgendas = async (): Promise<APIGatewayProxyResult> => {
  try {
    const agendaService = new AgendaService();
    const agendas = agendaService.getAgendas();

    return formatApiResponse(200, JSON.stringify(agendas));
  } catch (error) {
    console.error('Erro ao buscar agendas:', error);
    return formatApiResponse(
      500,
      JSON.stringify({ message: 'Erro interno do servidor ao buscar agendas.' }),
    );
  }
};
