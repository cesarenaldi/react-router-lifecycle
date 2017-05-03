import React from 'react'
import { Link } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'

import { RoutesProvider } from '../../../src/index'

import routes from './routes'

export default function App({ routes }) {
  return (
    <div>
      <Link to='/'>Home</Link> | <Link to='/about-us'>About Us</Link>
      <RoutesProvider routes={ routes }>
        {
          routes => renderRoutes(routes)
        }
      </RoutesProvider>
    </div>
  )
}

App.propTypes = {
  routes: PropTypes.array.isRequired
}
