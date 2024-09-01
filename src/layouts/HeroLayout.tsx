import { FC, ReactNode } from "react"

interface HeroProps {
  children?: ReactNode
}

const HeroLayout: FC<HeroProps> = ({ children }) => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center min-w-96 flex">{children}</div>
    </div>
  )
}

export default HeroLayout
