import { FC, useState } from "react"
import UsernameInput from "../inputs/Username"
import PasswordInput from "../inputs/PasswordInput"
import LoginService, {
  ILoginService
} from "../../../services/auth/LoginService"
import Swal from "sweetalert2"
//
const LoginForm: FC = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const credentials: ILoginService = {
      username: username,
      password: password
    }
    await LoginService(credentials)
      .then((response) => {
        if (response.status === 200 && response.data.token) {
          Swal.fire({
            title: "Success!",
            text: "You have successfully logged in.",
            icon: "success",
            confirmButtonText: "OK"
          })
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            Swal.fire({
              title: "Login Failed",
              text: "Invalid username or password.",
              icon: "error",
              confirmButtonText: "OK"
            })
          } else {
            Swal.fire({
              title: "Login Failed",
              text: "An unexpected error occurred. Please try again later.",
              icon: "error",
              confirmButtonText: "OK"
            })
          }
        } else if (error.request) {
          // The request was made but no response was received
          Swal.fire({
            title: "Network Error",
            text: "Unable to connect to the server. Please check your internet connection.",
            icon: "error",
            confirmButtonText: "OK"
          })
        } else {
          // Something happened in setting up the request that triggered an Error
          Swal.fire({
            title: "Error",
            text: "An unexpected error occurred. Please try again later.",
            icon: "error",
            confirmButtonText: "OK"
          })
        }
      })
  }

  return (
    <>
      <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <UsernameInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={"Username"}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"Password"}
            onToggle={true}
          />
          <div className="form-control mt-2">
            <button className="btn btn-primary">Login</button>
          </div>
          <a href="/auth/register" className="text-end underline">
            <small>Go to Sign up!</small>
          </a>
        </form>
      </div>
    </>
  )
}

export default LoginForm
