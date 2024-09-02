import { FC, ReactNode } from "react"

const DrawerSideContent: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <>
      <ul className="menu bg-base-100 text-base-content min-h-full w-auto p-4 rounded-2xl shadow-lg">
        {children}
      </ul>
    </>
  )
}

export default DrawerSideContent
