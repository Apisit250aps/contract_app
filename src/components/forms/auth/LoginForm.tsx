import React, { FC, useState } from "react"
import axios, { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import UsernameInput from "../inputs/Username"
import PasswordInput from "../inputs/PasswordInput"
import { ILoginService, LoginService } from "../../../services/auth.service"

interface FormErrors {
  username?: string
  password?: string
}

const LoginForm: FC = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [errors, setErrors] = useState<FormErrors>({})
  const navigate = useNavigate()
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "username":
        return value.trim() === "" ? "Username is required" : undefined
      case "password":
        return value.length < 6
          ? "Password must be at least 6 characters long"
          : undefined
      default:
        return undefined
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === "username") setUsername(value)
    if (name === "password") setPassword(value)

    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      username: validateField("username", username),
      password: validateField("password", password)
    }
    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error !== undefined)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validateForm()) {
      Swal.fire({
        title: "Validation Error",
        text: "Please correct the errors in the form",
        icon: "error",
        confirmButtonText: "OK"
      })
      return
    }

    const credentials: ILoginService = { username, password }

    try {
      const response = await LoginService(credentials)
      if (response.status === 200 && response.data.token) {
        Swal.fire({
          title: "Success!",
          text: "You have successfully logged in.",
          icon: "success",
          confirmButtonText: "OK"
        })
        navigate("/")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>
        if (axiosError.response) {
          if (axiosError.response.status === 400) {
            Swal.fire({
              title: "Login Failed",
              text: "Invalid username or password.",
              icon: "error",
              confirmButtonText: "OK"
            })
          } else {
            Swal.fire({
              title: "Login Failed",
              text:
                axiosError.response.data.message ||
                "An unexpected error occurred. Please try again later.",
              icon: "error",
              confirmButtonText: "OK"
            })
          }
        } else if (axiosError.request) {
          Swal.fire({
            title: "Network Error",
            text: "Unable to connect to the server. Please check your internet connection.",
            icon: "error",
            confirmButtonText: "OK"
          })
        } else {
          Swal.fire({
            title: "Error",
            text: "An unexpected error occurred. Please try again later.",
            icon: "error",
            confirmButtonText: "OK"
          })
        }
      } else {
        Swal.fire({
          title: "Error",
          text: "An unexpected error occurred. Please try again later.",
          icon: "error",
          confirmButtonText: "OK"
        })
      }
    }
  }

  return (
    <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit}>
        <UsernameInput
          value={username}
          onChange={handleChange}
          placeholder="Username"
          error={errors.username}
        />
        <PasswordInput
          value={password}
          onChange={handleChange}
          placeholder="Password"
          onToggle={true}
          error={errors.password}
        />
        <div className="form-control mt-2">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </div>
        <a href="/auth/register" className="text-end underline">
          <small>Go to Sign up!</small>
        </a>
      </form>
    </div>
  )
}

export default LoginForm
