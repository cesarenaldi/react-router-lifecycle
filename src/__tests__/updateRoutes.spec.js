import updateRoutes from '../updateRoutes';

const noop = () => null;
const routes = [
  {
    path: '/foo',
    onEnter: noop,
    onUpdate: noop,
    onLeave: noop,
    routes: [
      {
        path: '/foo/:id',
        onEnter: noop,
        onUpdate: noop,
        onLeave: noop
      }
    ]
  }
]

describe('Given the updateRoutes function', () => {
  describe('when updating a route', () => {
    it('should return a new list with the updated route', () => {
      const routeToUpdate = routes[0].routes[0]
      const updates = {
        foo: 42
      }
      const newRoutes = updateRoutes(routes, routeToUpdate, updates);

      expect(newRoutes[0].routes[0].foo).toEqual(42)
      expect(routeToUpdate !== newRoutes[0].routes[0]).toBeTruthy()
    })
  })
})
