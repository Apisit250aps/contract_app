import { FC, ReactNode } from "react"

const ContentCard: FC<{ children?: ReactNode; className?:string }> = ({ children , className}) => {
  return (
    <>
      <div className={`card bg-base-100 p-3 shadow-lg rounded-2xl ${className}`}>
        {children}
      </div>
    </>
  )
}

export default ContentCard
