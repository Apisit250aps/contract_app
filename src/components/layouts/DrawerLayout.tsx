import React from "react";
import { Outlet } from "react-router-dom";
import DrawerNav from "../navigate/nav/DrawerNav";
import NestedMenu from "../navigate/menu/NestedMenu";
import { contentRouter } from "../../router";

const DrawerLayout: React.FC = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="drawer-layout" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content py-2 px-2">
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
        ></label>
        <NestedMenu routes={contentRouter} />
      </div>
    </div>
  );
};

export default DrawerLayout;