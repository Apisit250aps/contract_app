import { FC, ReactNode } from "react"

const DrawerLink: FC<{ to: string; children: ReactNode }> = ({ to = "", children }) => {
  return (
    <>
      <li>
        <a href={to} className={location.pathname === to ? "active" : ""}>
          {children}
        </a>
      </li>
    </>
  )
}

export default DrawerLink
