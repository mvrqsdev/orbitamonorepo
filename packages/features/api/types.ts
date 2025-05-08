/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IApiErrorClass {
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
  message: string
}

export interface IApiErrorResponse {
  success: boolean
  error: IApiErrorClass
}

export interface IApiSuccessResponse {
  success: boolean
  data: any
}
