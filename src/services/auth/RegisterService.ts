import apiClient from ".."
import { AxiosResponse, AxiosError } from "axios"
export interface IRegisterService {
  username: string
  email: string
  password: string
}

const RegisterService = (
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
export default RegisterService
