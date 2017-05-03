import React from 'react'
import PropTypes from 'prop-types'

export default function (Placeholder) {
  return class HandleLifecycle extends React.Component {
    static contextTypes = {
      updateRoute: PropTypes.func.isRequired
    }

    static propTypes = {
      match: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired
    }

    state = {
      Component: this.props.route.__component || null
    }

    componentDidMount() {
      const { route, match } = this.props;

      if (typeof route.onEnter === 'function') {
        route.onEnter(match)
          .then(Component => {
            this.context.updateRoute(route, { __component: Component })
          })
      }
    }

    componentWillReceiveProps(nextProps) {
      const { route: nextRoute, match: nextMatch } = nextProps;
      const { route, match } = this.props;

      if (nextMatch.url !== match.url) {
        if (typeof nextRoute.onUpdate === 'function') {
          nextRoute.onUpdate(nextMatch)
        }
      }
      if (nextRoute !== route) {
        if (nextRoute.__component) {
          this.setState({
            Component: nextRoute.__component
          })
        }
      }
    }

    componentWillUnmount() {
      if (typeof this.props.route.onLeave === 'function') {
        this.props.route.onLeave()
      }
    }

    render() {
      const { Component } = this.state

      return (
        Component ?
          <Component { ...this.props } /> :
          <Placeholder { ...this.props } />
      )
    }
  }
}
