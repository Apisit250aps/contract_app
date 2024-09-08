import { RouteObject, Link, useLocation } from "react-router-dom"

const MenuItem: React.FC<{
  route: RouteObject
  parentPath?: string
}> = ({ route, parentPath = "" }) => {
  const fullPath = parentPath
    ? `${parentPath}/${route.path || ""}`
    : route.path || ""
  const hasChildren = route.children && route.children.length > 0
  const location = useLocation()
  return (
    <li>
      {hasChildren ? (
        <details open>
          <summary>
            {route.icon} {route.name}
          </summary>
          <ul className="pt-1">
            {route.children?.map((childRoute, index) => (
              <MenuItem key={index} route={childRoute} parentPath={fullPath} />
            ))}
          </ul>
        </details>
      ) : (
        <Link
          to={route.path as string}
          className={`${location.pathname == route.path ? "active" : ""} mb-1`}
        >
          {route.icon} {route.name}
        </Link>
      )}
    </li>
  )
}

const NestedMenu: React.FC<{ routes: RouteObject[] }> = ({ routes }) => {
  return (
    <ul className="menu bg-base-100 h-full rounded-box w-56 shadow-xl">
      {routes[0].children?.map((route, index) => (
        <MenuItem key={index} route={route} parentPath="/" />
      ))}
    </ul>
  )
}

export default NestedMenu
