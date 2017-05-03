import { matchRoutes } from 'react-router-config'
import updateRoutes from './updateRoutes'

export default function (routes, path) {
  const matches = matchRoutes(routes, path)

  if (matches.length === 0) {
    return Promise.resolve([])
  }

  return Promise
    .all(
      matches.map(({ route, match }) => {
        if (typeof route.onEnter === 'function') {
          return route.onEnter(match).then(Component => {
            routes = updateRoutes(routes, route, { __component: Component })
          })
        }
        return Promise.resolve()
      })
    )
    .then((values) => routes)
}
