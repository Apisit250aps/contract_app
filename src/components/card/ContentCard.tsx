import { FC, ReactNode } from "react"

const ContentCard: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="card bg-base-100 p-3 shadow-lg rounded-2xl">
        {children}
      </div>
    </>
  )
}

export default ContentCard
