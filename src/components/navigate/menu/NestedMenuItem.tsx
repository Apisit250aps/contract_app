import { RouteObject } from "react-router-dom"

interface NestedMenuProps {
  routes: RouteObject[]
}

const MenuItem: React.FC<{ route: RouteObject }> = ({ route }) => {
  const hasChildren = route.children && route.children.length > 0

  return (
    <li>
      {hasChildren ? (
        <details open>
          <summary>
            {route.icon} {route.name}
          </summary>
          <ul>
            {route.children?.map((childRoute, index) => (
              <MenuItem key={index} route={childRoute} />
            ))}
          </ul>
        </details>
      ) : (
        <a
          href={route.path}
          className={location.pathname == route.path ? "active" : ""}
        >
          {route.icon} {route.name}
        </a>
      )}
    </li>
  )
}

const NestedMenu: React.FC<NestedMenuProps> = ({ routes }) => {
  return (
    <ul className="menu bg-base-100 h-full rounded-box w-56">
      {routes[0].children?.map((route, index) => (
        <MenuItem key={index} route={route} />
      ))}
    </ul>
  )
}

export default NestedMenu
