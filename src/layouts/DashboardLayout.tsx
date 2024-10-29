import { FC } from "react"
import { Outlet } from "react-router-dom"
import SideMenu, { MenuNav, MenuParent } from "../components/menu/SideMenu"
import Navbar from "../components/navigate/Navbar"

export const OpenDrawer: FC = () => {
  return (
    <>
      <label
        htmlFor="dashboard-layout"
        className="btn btn-square btn-ghost lg:hidden"
      >
        <i className="bx bx-menu-alt-left"></i>
      </label>
    </>
  )
}

const DashboardLayout: FC = () => {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input
          id="dashboard-layout"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          {/* Page content here */}
          <main className="p-3">
            <Navbar title={"Contracting"} leading={<OpenDrawer />} />
            <Outlet />
          </main>
        </div>
        <div className="drawer-side py-3">
          <label
            htmlFor="dashboard-layout"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <SideMenu>
            <MenuParent title={"Dashboard"}>
              <MenuNav to={"/"}>Home</MenuNav>
              <MenuNav to={"/employee"}>Employee</MenuNav>
            </MenuParent>
          </SideMenu>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
