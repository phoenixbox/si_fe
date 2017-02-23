import React, {
  PropTypes,
  Component
} from 'react'
import Header from '../../components/Header'

class Core extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render () {
    const { children } = this.props

    return (
      <div className="flx flx-auto">
        <Header />
        {children}
      </div>
    )
  }
}

module.exports = Core
