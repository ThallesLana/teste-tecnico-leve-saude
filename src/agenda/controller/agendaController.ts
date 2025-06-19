import { APIGatewayProxyResult } from 'aws-lambda';
import { AgendaService } from '../service/agendaService';

export const getAgendas = async (): Promise<APIGatewayProxyResult> => {
  try {
    const agendaService = new AgendaService();
    const agendas = agendaService.getAgendas();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(agendas),
    };
  } catch (error) {
    console.error('Erro ao buscar agendas:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: 'Erro interno do servidor ao buscar agendas.' }),
    };
  }
};
