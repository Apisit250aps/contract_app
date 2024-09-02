import apiClient from "."
import { AxiosResponse, AxiosError } from "axios"

export interface IRegisterService {
  username: string
  email: string
  password: string
}

export interface ILoginService {
  username: string
  password: string
}

export const RegisterService = (
  credentials: IRegisterService
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    apiClient({
      method: "post",
      url: "/auth/register",
      data: credentials
    })
      .then((response: AxiosResponse) => resolve(response))
      .catch((error: AxiosError<{ response: AxiosResponse }>) => reject(error))
  })
}

export const LoginService = async (
  credentials: ILoginService
): Promise<AxiosResponse> =>
  new Promise((resolve, reject) => {
    apiClient({
      method: "post",
      url: "/auth/login",
      data: credentials
    })
      .then((response: AxiosResponse) => resolve(response))
      .catch((error: AxiosError) => reject(error))
  })
