import { FC, ReactNode } from "react"
import DrawerNav from "../components/navigate/nav/DrawerNav"
import DrawerSideContent from "../components/navigate/menu/side/DrawerSideContent"
import DrawerLink from "../components/navigate/nav/DrawerLink"


interface DrawerLayoutProp {
  children?: ReactNode
}

const DrawerLayout: FC<DrawerLayoutProp> = ({ children }) => {
  
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="drawer-layout" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content py-2 px-2 lg:px-0">
          <DrawerNav />
          {/* Page content here */}
          <main>{children}</main>
        </div>
        <div className="drawer-side p-0 lg:p-2">
          <label
            htmlFor="drawer-layout"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <DrawerSideContent>
            <DrawerLink to={"/"}>
              <i className="bx bx-home-alt"></i>
              Home
            </DrawerLink>
          </DrawerSideContent>
        </div>
      </div>
    </>
  )
}

export default DrawerLayout
