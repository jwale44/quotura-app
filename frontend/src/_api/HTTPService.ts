import axios, { AxiosError, AxiosResponse } from "axios"

declare module "axios" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type
  interface AxiosResponse<T = any> extends Promise<T> {}
}

const handleResponse = (response: AxiosResponse) => {
  return response.data
}

const handleError = async (error: AxiosError) => {
  const isUnaAuthenticated = error.response?.status == 401
  if (isUnaAuthenticated) {
    window.location.href = "/"
    return
  }

  return Promise.reject(error)
}

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

const httpService = axios.create({
  baseURL,
  timeout: 30 * 1000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

httpService.interceptors.request.use((config) => config, handleError)
httpService.interceptors.response.use(handleResponse, handleError)

export default httpService
