import apiClient from ".."
import { AxiosError, AxiosResponse } from "axios"
export interface ILoginService {
  username: string
  password: string
}

const LoginService = async (
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

export default LoginService
