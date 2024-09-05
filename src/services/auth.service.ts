import apiClient from "."
import { AxiosResponse, AxiosError } from "axios"
import { STORE_TOKEN } from "../middleware/auth.middleware";

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

export const setToken = (token: string) => {
  localStorage.setItem(STORE_TOKEN, token)
}

// ฟังก์ชันสำหรับดึง Token จาก localStorage
export const getToken = (): string | null => {
  return localStorage.getItem(STORE_TOKEN)
}

// ฟังก์ชันสำหรับลบ Token ออกจาก localStorage
export const removeToken = () => {
  localStorage.removeItem(STORE_TOKEN)
}
