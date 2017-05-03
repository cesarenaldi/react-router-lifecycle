import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { RoutesProvider, initializeRoutes } from '../../../src/index'

import App from './App'
import routes from './routes'

initializeRoutes(routes, location.pathname)
  .then(
    newRoutes => ReactDOM.render(
      (
        <BrowserRouter>
          <App routes={ newRoutes } />
        </BrowserRouter>
      ),
      document.getElementById('root')
    )
  )


