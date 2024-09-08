import React, { FC, useState, useCallback } from "react";
import Swal from "sweetalert2";
import UsernameInput from "../inputs/Username";
import PasswordInput from "../inputs/PasswordInput";
import authService, {
  IAuthCredentials,
  setToken
} from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface FormErrors {
  username?: string;
  password?: string;
}

const LoginForm: FC = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();

  const validateField = useCallback((name: string, value: string): string | undefined => {
    switch (name) {
      case "username":
        return value.trim() === "" ? "Username is required" : undefined;
      case "password":
        return value.length < 6 ? "Password must be at least 6 characters long" : undefined;
      default:
        return undefined;
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField]);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {
      username: validateField("username", formData.username),
      password: validateField("password", formData.password)
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== undefined);
  }, [formData, validateField]);

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      Swal.fire({
        title: "Validation Error",
        text: "Please correct the errors in the form",
        icon: "error",
        confirmButtonText: "OK"
      });
      return;
    }

    try {
      const { token } = await authService.login(formData as IAuthCredentials);
      if (token) {
        setToken(token);
        Swal.fire({
          text: "Login Success",
          icon: "success"
        });
        setTimeout(() => navigate("/"), 500);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Swal.fire({
          text: error.response?.data.message || "An error occurred",
          icon: "error"
        });
      }
    }
  }, [formData, navigate, validateForm]);

  return (
    <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit}>
        <UsernameInput
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          error={errors.username}
        />
        <PasswordInput
          value={formData.password}
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
  );
};

export default LoginForm;