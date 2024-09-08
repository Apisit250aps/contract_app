
import apiClient from "."
import { AxiosResponse, AxiosError } from "axios"
export const tokenStore = "contracting_auth_token"
export interface IAuthCredentials {
  username: string
  password: string
  _id?: string
}

export interface IAuthResponse {
  token: string
}

export const getToken = (): string => {
  return localStorage.getItem(tokenStore) as string || ""
}

export const delToken = (): void => {
  localStorage.removeItem(tokenStore)
  return
}

export const setToken = (token: string): void => {
  localStorage.setItem(tokenStore, token)
  return
}

export default {
  register: async (
    credentials: IAuthCredentials
  ): Promise<IAuthCredentials> => {
    try {
      const response: AxiosResponse<IAuthCredentials> = await apiClient.post(
        "/auth/register",
        credentials
      )
      return response.data
    } catch (error) {
      throw error as AxiosError
    }
  },

  login: async (credentials: IAuthCredentials): Promise<IAuthResponse> => {
    try {
      const response: AxiosResponse<IAuthResponse> = await apiClient.post(
        "/auth/login",
        credentials
      )
      return response.data
    } catch (error) {
      throw error as AxiosError
    }
  }
}
