import React from 'react'
import initializeRoutes from '../initializeRoutes'

const Component = props => <h1>My component</h1>
const Loading = props => <p>loading...</p>
const routes = [
  {
    path: '/foo',
    onEnter: jest.fn(match => Promise.resolve(Component)),
    onUpdate: jest.fn(),
    onLeave: jest.fn(),
    routes: [
      {
        path: '/foo/:id',
        onEnter: jest.fn(match => Promise.resolve(Component)),
        onUpdate: jest.fn(),
        onLeave: jest.fn()
      }
    ]
  }
]

describe('Given the initializeRoutes function', () => {
  describe('when initializing a list of nested routes', () => {
    it('should invoke the onEnter handler of every matching route ' +
        'and store the resolved component in the route.__component property', () => {
      return initializeRoutes(routes, '/foo/42').then(newRoutes => {
        expect(newRoutes[0].onEnter).toHaveBeenCalled();
        expect(newRoutes[0]).toHaveProperty('__component', Component);
        expect(newRoutes[0].routes[0].onEnter).toHaveBeenCalled();
        expect(newRoutes[0].routes[0]).toHaveProperty('__component', Component);
      })
    })
  })
})
