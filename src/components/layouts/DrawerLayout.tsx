import { FC } from "react"
import { Outlet, RouteObject } from "react-router-dom"
import DrawerNav from "../navigate/nav/DrawerNav"
import DrawerSideContent from "../navigate/menu/side/DrawerSideContent"
import DrawerLink from "../navigate/nav/DrawerLink"
import { IndexRouter } from "../../router"

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
        <DrawerSideContent>
          {IndexRouter.map((fr: RouteObject, fi) =>
            !fr.children?.length ? (
              <DrawerLink to={fr.path as string} key={fi}>
                {fr.icon}
                {fr.name}
              </DrawerLink>
            ) : (
              fr.children.map((sr, si) => (
                <DrawerLink
                  to={sr.index ? (fr.path as string) : (sr.path as string)}
                  key={si}
                >
                  {sr.icon}
                  {sr.name}
                </DrawerLink>
              ))
            )
          )}
        </DrawerSideContent>
      </div>
    </div>
  )
}

export default DrawerLayout
