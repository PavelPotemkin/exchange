const STATUS_CODES = {
  SERVER_ERROR: 500,
  BAD_REQUEST: 400,
} as const

export class NetworkError extends Error {}

export class NetworkBadRequestError extends NetworkError {
  public code: number = STATUS_CODES.BAD_REQUEST
}

export class NetworkServerError extends NetworkError {
  public code: number = STATUS_CODES.SERVER_ERROR
}

export const getApiError = (error: unknown) => {
  if (error instanceof Error && error.name === 'FetchError') {
    const fetchError = error as unknown as {
      data: {
        statusCode: number
        message: string
      }
      status: number
      statusCode: number
      statusMessage: string
      statusText: string
      cause?: {
        name: string
      }
    }

    if (fetchError.cause?.name === 'AbortError') {
      return new NetworkError('Request was aborted')
    }

    if (fetchError.data.statusCode === 500) {
      return new NetworkServerError(fetchError.data.message)
    }
    else {
      return new NetworkBadRequestError(fetchError.data.message)
    }
  }
  else {
    return new NetworkBadRequestError('Unknown error')
  }
}
