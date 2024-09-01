import React, { FC, useState } from "react"
import UsernameInput from "../inputs/Username"
import PasswordInput from "../inputs/PasswordInput"
import EmailInput from "../inputs/EmailInput"
import RegisterService, {
  IRegisterService
} from "../../../services/auth/RegisterService"
import Swal from "sweetalert2"
import axios, { AxiosError } from "axios"

interface FormErrors {
  username?: string
  email?: string
  password?: string
}

const RegisterForm: FC = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [errors, setErrors] = useState<FormErrors>({})

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "username":
        return value.length < 3
          ? "Username must be at least 3 characters long"
          : undefined
      case "email":
        return !/\S+@\S+\.\S+/.test(value) ? "Email is invalid" : undefined
      case "password":
        return value.length < 8
          ? "Password must be at least 8 characters long"
          : undefined
      default:
        return undefined
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === "username") setUsername(value)
    if (name === "email") setEmail(value)
    if (name === "password") setPassword(value)

    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      username: validateField("username", username),
      email: validateField("email", email),
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
    const credentials: IRegisterService = { username, email, password }
    try {
      const response = await RegisterService(credentials)
      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Registration completed successfully.",
          icon: "success",
          confirmButtonText: "OK"
        })
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>
        if (axiosError.response) {
          Swal.fire({
            title: "Registration Failed",
            text:
              axiosError.response.data.message ||
              "An unexpected error occurred",
            icon: "error",
            confirmButtonText: "OK"
          })
        } else if (axiosError.request) {
          // The request was made but no response was received
          Swal.fire({
            title: "Network Error",
            text: "Unable to connect to the server. Please try again later.",
            icon: "error",
            confirmButtonText: "OK"
          })
        } else {
          // Something happened in setting up the request that triggered an Error
          Swal.fire({
            title: "Error",
            text: "An unexpected error occurred. Please try again.",
            icon: "error",
            confirmButtonText: "OK"
          })
        }
      } else {
        // Handle non-Axios errors
        Swal.fire({
          title: "Error",
          text: "An unexpected error occurred. Please try again.",
          icon: "error",
          confirmButtonText: "OK"
        })
      }
    }
  }

  return (
    <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit}>
        <EmailInput
          onChange={handleChange}
          value={email}
          error={errors.email}
        />
        <UsernameInput
          onChange={handleChange}
          value={username}
          error={errors.username}
        />
        <PasswordInput
          onChange={handleChange}
          value={password}
          onToggle={true}
          error={errors.password}
        />
        <div className="form-control mt-2">
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </div>
        <a href="/auth/login" className="text-end underline">
          <small>Back to Login!</small>
        </a>
      </form>
    </div>
  )
}

export default RegisterForm
