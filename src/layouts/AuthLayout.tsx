import { FC } from "react"
import { Outlet } from "react-router-dom"

const AuthLayout: FC = () => {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AuthLayout
