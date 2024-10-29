import { FC } from "react"
import { NavLink, Outlet } from "react-router-dom"

const DashboardLayout: FC = () => {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {/* Page content here */}
          <main>
            <Outlet />
          </main>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-auto p-4">
            {/* Sidebar content here */}
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
