import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import styles from '../utils/styles'
import '../styles/core.scss'

export default class AppContainer extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <div className='flx flx-auto h-100' style={{ backgroundColor: styles.loading }}>
          <Router history={browserHistory} children={routes} />
        </div>
      </Provider>
    )
  }
}
