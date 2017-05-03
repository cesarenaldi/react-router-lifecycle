import React from 'react'
import { MemoryRouter, Router } from 'react-router'
import createHistory from 'history/createMemoryHistory'
import { renderRoutes } from 'react-router-config'
import { mount } from 'enzyme'

import { RoutesProvider, initializeRoutes, handleLifecycle } from '../index';

const MyParentComponent = ({ route }) => (
  <div>
    { renderRoutes(route.routes) }
  </div>
)
const MyComponent = () => <p>ready!</p>
const Loading = () => <p>loading...</p>
const routes = [
  {
    path: '/foo/',
    component: MyParentComponent,
    routes: [
      {
        path: '/foo/:id',
        // simulates () => import('./path/to/MyComponent').then(extractDefault)
        onEnter: jest.fn(() => Promise.resolve(MyComponent)),
        onUpdate: jest.fn(),
        onLeave: jest.fn(),
        component: handleLifecycle(Loading)
      }
    ]
  },
  {
    path: '/bar',
    component: () => <p>bar</p>
  }
]
const App = ({ history, routes }) => (
  <Router history={ history }>
    <RoutesProvider routes={ routes }>
      {
        routes => (
          <div>
            { renderRoutes(routes) }
          </div>
        )
      }
    </RoutesProvider>
  </Router>
)
var history;

describe('Given an app that make use of React Router', () => {
  describe('and the rendering tree includes RoutesProvider component', () => {
    describe('and the matching route uses an handleLifecycle HoC as route.component', () => {
      beforeAll(function () {
        history = createHistory({
          initialEntries: [ '/foo/42' ],
          initialIndex: 0
        })
      })

      describe('when rendering the app', () => {
        it('should render the placeholder component, then resolve and render the lazy loaded component', done => {
          const wrapper = mount(<App history={ history } routes={ routes } />)

          expect(wrapper.find(Loading)).toHaveLength(1)

          process.nextTick(() => {
            expect(wrapper.find(MyComponent)).toHaveLength(1)
            done()
          })
        })
      })

      describe('when rendering the app with initialized routes', () => {
        it('should render the resolved route component straightaway', () => {
          return initializeRoutes(routes, '/foo/42')
            .then(routes => {
              const wrapper = mount(<App history={ history } routes={ routes } />)

              expect(wrapper.find(MyComponent)).toHaveLength(1)
            })
        })
      })

      describe('when the location changes', () => {
        var wrapper;

        beforeAll(function () {
          wrapper = mount(<App history={ history } routes={ routes } />)
        })

        beforeEach(function () {
          routes[0].routes[0].onUpdate.mockClear()
        })

        describe('but the router resolves the new location with the same route', () => {
          it('should invoke the route onUpdate callback with the new `match` object', () => {
            history.push('/foo/83')

            const onUpdateMock = routes[0].routes[0].onUpdate;

            expect(onUpdateMock).toBeCalledWith(
              expect.objectContaining({
                url: '/foo/83',
                params: {
                  id: '83'
                }
              })
            )
          })
        })

        describe('and the router resolves the new location a different route', () => {
          it('should invoke the route onLeave callback and NOT invoke the route onLeave callback', () => {
            history.push('/bar')

            const { onLeave: onLeaveMock, onUpdate: onUpdateMock } = routes[0].routes[0];

            expect(onLeaveMock).toHaveBeenCalled()
            expect(onUpdateMock).not.toHaveBeenCalled()
          })
        })
      })
    })
  })
})
