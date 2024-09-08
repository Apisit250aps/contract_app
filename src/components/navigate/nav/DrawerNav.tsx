import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { delToken } from "../../../services/auth.service"
const DrawerNav: FC = () => {
  const navigate = useNavigate()
  const logout = () => {
    delToken()
    navigate("/auth/login")
  }

  return (
    <>
      <div className="navbar bg-base-100 rounded-2xl shadow-lg">
        <div className="flex-none">
          <label
            htmlFor="drawer-layout"
            className="btn btn-ghost text-black drawer-button"
          >
            <i className="bx bx-menu-alt-left"></i>
          </label>
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1 btn-ghost">
              <i className="bx bx-dots-vertical-rounded"></i>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-auto p-2 shadow"
            >
              <li>
                <a className="text-red-600 bg-base-100 hover:text-base-100 hover:bg-red-600 outline outline-1 font-semibold" onClick={logout}>
                  <i className="bx bx-power-off"></i>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default DrawerNav
