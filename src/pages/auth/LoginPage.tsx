import { FC } from "react"
import LoginForm from "../../components/form/auth/LoginForm"
import { Link } from "react-router-dom"

const LoginPage: FC = () => {
  return (
    <>
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Staff Login Portal</h1>
        <p className="py-6">
          Welcome to the internal management system for staff and
          administrators. Please sign in with your assigned account to manage
          and track your work assignments.
        </p>
        <Link to={"/auth/register"} className=" link">
          No account? Contact system administrator
        </Link>
      </div>
      <LoginForm />
    </>
  )
}

export default LoginPage