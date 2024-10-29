import { FC } from "react"
import { Link } from "react-router-dom"

const NotFound: FC = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">404</h1>
          <p className="py-6">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Link to="/" className="btn btn-outline">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
