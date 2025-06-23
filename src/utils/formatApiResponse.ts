export function formatApiResponse(statusCode: number, body: string): object {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: body,
  };
}
