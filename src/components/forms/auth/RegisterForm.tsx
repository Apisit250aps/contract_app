import { FC, useState } from "react"
import UsernameInput from "../inputs/Username"
import PasswordInput from "../inputs/PasswordInput"
import EmailInput from "../inputs/EmailInput"
import RegisterService, {
  IRegisterService
} from "../../../services/auth/RegisterService"
import Swal from "sweetalert2"
//
const RegisterForm: FC = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const credentials: IRegisterService = {
      username: username,
      email: email,
      password: password
    }
    await RegisterService(credentials)
      .then((response) => {
        if (response.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Registration completed successfully.",
            icon: "success",
            confirmButtonText: "OK"
          })
        }
      })
      .catch((error) => {
        console.error(error)
        if (error.response) {
          Swal.fire({
            title: "Registration Failed",
            text: error.response.data.message,
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
          <EmailInput
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <UsernameInput
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            onToggle={true}
          />
          <div className="form-control mt-2">
            <button className="btn btn-primary">Login</button>
          </div>
          <a href="/auth/login" className="text-end underline">
            <small>Back to Login!</small>
          </a>
        </form>
      </div>
    </>
  )
}

export default RegisterForm
