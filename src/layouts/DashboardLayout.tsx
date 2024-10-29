import { FC } from "react"
import { Outlet } from "react-router-dom"
import SideMenu, { MenuNav, MenuParent } from "../components/menu/SideMenu"

const DashboardLayout: FC = () => {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {/* Page content here */}
          <main className="p-3">
            <Outlet />
          </main>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
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
