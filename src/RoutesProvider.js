import React from 'react'
import PropTypes from 'prop-types'
import updateRoutes from './updateRoutes'

export default class RoutesProvider extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    routes: PropTypes.array.isRequired
  }

  static childContextTypes = {
    updateRoute: React.PropTypes.func.isRequired
  }

  state = {
    routes: this.props.routes
  }

  getChildContext() {
    return {
      updateRoute: (route, update) => {
        this.setState({
          routes: updateRoutes(this.state.routes, route, update)
        })
      }
    }
  }

  render() {
    return this.props.children(this.state.routes)
  }
}
