import React, {
  PropTypes,
  Component
} from 'react'
import _ from 'lodash'
import classnames from 'classnames'

class EmptyWell extends Component {
  static propTypes = {
    title: PropTypes.string
  }

  render() {
    const { title } = this.props

    return (
      <div className='bg-black-05 tc br2 ma2' style={{height: '14rem'}}>
        <div className="flx justify-center h-100">
          <div className="f4">{title}</div>
        </div>
      </div>
    )
  }
}
module.exports = EmptyWell
