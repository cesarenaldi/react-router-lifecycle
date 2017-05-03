import update from 'immutability-helper'

function createUpdateInstructions(routes, routeToUpdate, updates) {
  return routes.reduce((instructions, route, idx) => {
    if (route.path === routeToUpdate.path) {
      instructions[idx] = { $merge: updates }
    } else if (Array.isArray(route.routes)) {
      instructions[idx] = {
        ...(
          Array.isArray(route.routes) ?
          { routes: createUpdateInstructions(route.routes, routeToUpdate, updates) } :
          {}
        )
      }
    }
    return instructions
  }, {})
}

export default function (routes, route, updates) {
  const instructions = createUpdateInstructions(routes, route, updates)

  return update(routes, instructions)
}
