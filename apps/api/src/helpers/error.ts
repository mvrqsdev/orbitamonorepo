export class APIError extends Error {
  public readonly statusCode: string
  constructor({
    statusCode,
    message,
  }: {
    message: string
    statusCode:
      | 'BAD_REQUEST'
      | 'UNAUTHORIZED'
      | 'FORBIDDEN'
      | 'NOT_FOUND'
      | 'METHOD_NOT_SUPPORTED'
      | 'TIMEOUT'
      | 'CONFLICT'
      | 'PRECONDITION_FAILED'
      | 'PAYLOAD_TOO_LARGE'
      | 'UNSUPPORTED_MEDIA_TYPE'
      | 'UNPROCESSABLE_CONTENT'
      | 'TOO_MANY_REQUESTS'
      | 'CLIENT_CLOSED_REQUEST'
      | 'INTERNAL_SERVER_ERROR'
      | 'NOT_IMPLEMENTED'
      | 'BAD_GATEWAY'
      | 'SERVICE_UNAVAILABLE'
      | 'GATEWAY_TIMEOUT'
  }) {
    super(message)
    this.statusCode = statusCode
  }
}
