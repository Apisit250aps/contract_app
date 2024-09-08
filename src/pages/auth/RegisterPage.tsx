import { FC } from "react"
import HeroLayout from "../../components/layouts/HeroLayout"
import RegisterForm from "../../components/forms/auth/RegisterForm"
const RegisterPage: FC = () => {
  return (
    <>
      <HeroLayout>
        <RegisterForm />
      </HeroLayout>
    </>
  )
}

export default RegisterPage
