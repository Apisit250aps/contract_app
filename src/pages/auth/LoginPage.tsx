import { FC } from "react"
import HeroLayout from "../../components/layouts/HeroLayout"
import LoginForm from "../../components/forms/auth/LoginForm"
const LoginPage: FC = () => {
  return (
    <>
      <HeroLayout>
        <LoginForm />
      </HeroLayout>
    </>
  )
}

export default LoginPage
