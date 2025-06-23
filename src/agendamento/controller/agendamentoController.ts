import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { IAgendamentoPayload } from '../interface/agendamento.interface';
import { formatApiResponse } from '../../utils/formatApiResponse';
import { AgendamentoService } from '../service/agendamentoService';

const validateAgendamentoPayload = (payload: unknown): string[] | null => {
  const errors: string[] = [];

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    errors.push('Payload da requisição inválido. Deve ser um objeto JSON.');
    return errors;
  }

  const agendamento = payload as IAgendamentoPayload;

  if (typeof agendamento.medico !== 'string' && agendamento.medico.trim().length > 0) {
    errors.push('O campo "medico" é obrigatório e deve ser uma string não vazia.');
  }

  if (typeof agendamento.paciente !== 'string' && agendamento.paciente.trim().length > 0) {
    errors.push('O campo "paciente" é obrigatório e deve ser uma string não vazia.');
  }

  if (
    typeof agendamento.data_horario !== 'string' ||
    agendamento.data_horario.trim().length === 0
  ) {
    errors.push('O campo "data_horario" é obrigatório e deve ser uma string não vazia.');
  } else if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(agendamento.data_horario)) {
    errors.push(
      'O campo "data_horario" possui um formato inválido. Use YYYY-MM-DD HH:MM (ex: 2024-10-05 09:00).',
    );
  }

  return errors.length > 0 ? errors : null;
};

export const createAgendamento = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return formatApiResponse(400, JSON.stringify({ message: 'Corpo da requisição ausente.' }));
  }

  let rawPayload: unknown;

  try {
    rawPayload = JSON.parse(event.body);
  } catch (err) {
    console.error(err);
    return formatApiResponse(
      400,
      JSON.stringify({ message: 'Formato de JSON inválido no corpo da requisição.' }),
    );
  }

  const agendamentoPayload = rawPayload?.agendamento;

  const validationErrors = validateAgendamentoPayload(agendamentoPayload);

  if (validationErrors) {
    return formatApiResponse(
      400,
      JSON.stringify({
        message: 'Falha na validação dos dados de agendamento.',
        errors: validationErrors,
      }),
    );
  }

  try {
    const agendamentoService = new AgendamentoService();
    const res = agendamentoService.createAgendamento(agendamentoPayload as IAgendamentoPayload);

    return formatApiResponse(201, JSON.stringify(res));
  } catch (err) {
    console.error('Erro ao criar o agendamento:', err);
    return formatApiResponse(
      500,
      JSON.stringify({ message: 'Erro interno do servidor ao criar agendamento.' }),
    );
  }
};
