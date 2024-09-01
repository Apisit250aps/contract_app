import apiClient from ".."

export interface ILoginService {
  username: string
  password: string
}

const LoginService = async (credentials: ILoginService): Promise<boolean> => {
  try {
    const response = await apiClient({
      method: "post",
      url: "/auth/login",
      data: credentials
    })
    if (response.status === 200) {
      const { token } = response.data
      localStorage.setItem("token", token)
      return true
    }
    return false
  } catch (error) {
    console.error("Login failed", error)
    return false
  }
}

export default LoginService
