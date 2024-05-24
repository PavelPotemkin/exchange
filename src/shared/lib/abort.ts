export const createWithAbort = () => {
  let abortController: AbortController | null = null

  return async (apiCall: (signal: AbortSignal) => Promise<any>) => {
    if (abortController) {
      abortController.abort()
    }

    abortController = new AbortController()
    const { signal } = abortController

    return apiCall(signal)
  }
}
