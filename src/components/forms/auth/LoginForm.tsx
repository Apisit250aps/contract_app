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
    const login = await LoginService(credentials)
    if (login) {
      Swal.fire({
        title: "Success!",
        text: "You have logged in successfully.",
        icon: "success",
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
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default LoginForm
