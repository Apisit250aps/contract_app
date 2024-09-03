import { FC } from "react";
import { Outlet } from "react-router-dom";
import DrawerNav from "../navigate/nav/DrawerNav";
import DrawerSideContent from "../navigate/menu/side/DrawerSideContent";
import DrawerLink from "../navigate/nav/DrawerLink";

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
          <DrawerLink to="/">
            <i className="bx bx-home-alt" />
            Home
          </DrawerLink>
          <DrawerLink to="/project">
            <i className="bx bx-briefcase" />
            Project
          </DrawerLink>
        </DrawerSideContent>
      </div>
    </div>
  );
};

export default DrawerLayout;