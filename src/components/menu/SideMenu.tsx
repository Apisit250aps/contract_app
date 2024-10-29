import { FC, ReactNode } from "react"
import { NavLink } from "react-router-dom"

export const MenuParent: FC<{ title: string; children?: ReactNode }> = ({
  title,
  children
}) => {
  return (
    <>
      <li>
        <h2 className="menu-title">{title}</h2>
        <ul>{children}</ul>
      </li>
    </>
  )
}

export const MenuNav: FC<{
  to: string
  children: string
  icon?: ReactNode
}> = ({ to, children }) => {
  return (
    <>
      <li className=" mb-1">
        <NavLink
          to={to}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {children}
        </NavLink>
      </li>
    </>
  )
}

const SideMenu: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <>
      <ul className="menu bg-base-200 rounded-box w-56 p-4 min-h-full">
        {children}
      </ul>
    </>
  )
}

export default SideMenu
