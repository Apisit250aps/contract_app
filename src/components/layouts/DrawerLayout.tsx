import { FC } from "react"
import { Outlet } from "react-router-dom"
import DrawerNav from "../navigate/nav/DrawerNav"
// import DrawerSideContent from "../navigate/menu/side/DrawerSideContent"
// import DrawerLink from "../navigate/nav/DrawerLink"
// import { IndexRouter } from "../../router"
import NestedMenu from "../navigate/menu/NestedMenuItem"
import { IndexRouter } from "../../router";

const DrawerLayout: FC = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="drawer-layout" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-2">
        <DrawerNav />
        <main className="mt-3">
          <Outlet />
        </main>
      </div>
      <div className="drawer-side p-0 lg:p-2">
        <label
          htmlFor="drawer-layout"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <NestedMenu routes={IndexRouter}/>
      </div>
    </div>
  )
}

export default DrawerLayout
