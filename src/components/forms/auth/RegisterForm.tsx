import React, { FC, useState, useCallback } from "react";
import UsernameInput from "../inputs/Username";
import PasswordInput from "../inputs/PasswordInput";
import Swal from "sweetalert2";
import authService, { IAuthCredentials } from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
}

const RegisterForm: FC = () => {
  const [formData, setFormData] = useState<FormData>({ username: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();

  const validateField = useCallback((name: string, value: string): string | undefined => {
    switch (name) {
      case "username":
        return value.length < 3 ? "Username must be at least 3 characters long" : undefined;
      case "password":
        return value.length < 8 ? "Password must be at least 8 characters long" : undefined;
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
      const data = await authService.register(formData as IAuthCredentials);
      if (data) {
        Swal.fire({
          text: "Register successfully!",
          icon: "success"
        });
        setTimeout(() => navigate("/auth/login"), 500);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Swal.fire({
          text: error.response?.data.message || "An error occurred during registration",
          icon: "error"
        });
      }
    }
  }, [formData, navigate, validateForm]);

  return (
    <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit}>
        <UsernameInput
          onChange={handleChange}
          value={formData.username}
          error={errors.username}
        />
        <PasswordInput
          onChange={handleChange}
          value={formData.password}
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
  );
};

export default RegisterForm;