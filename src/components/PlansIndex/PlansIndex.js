import React, {
  Component,
  PropTypes
} from 'react'
// Components
import ReactList from 'react-list'
import Dimensions from 'react-dimensions'
import PlanCard from '../PlanCard'

import _ from 'lodash'

class PlansIndex extends Component {
  constructor (props) {
    super(props)

    this.renderRow = this.renderRow.bind(this)
  }

  static propTypes = {
    plans: PropTypes.array.isRequired,
    containerHeight: PropTypes.number.isRequired,
    containerWidth: PropTypes.number.isRequired
  }

  renderRow (index, key) {
    const {
      plans
    } = this.props
    const plan = plans[index]

    return (
      <div className='bg-white pa1' key={key}>
        <PlanCard {...plan} />
      </div>
    )
  }

  render () {
    const {
      containerHeight,
      containerWidth,
      plans
    } = this.props

    const wrapperStyles = {
      overflow: 'auto',
      height: containerHeight,
      width: containerWidth
    }
    let content
    if (plans.length) {
      content = (
        <ReactList
          itemRenderer={this.renderRow}
          length={plans.length}
          type='variable' />
      )
    } else {
      content = <h1>Nothing</h1>
    }

    return (
      <div style={wrapperStyles}>
        {content}
      </div>
    )
  }
}

export default Dimensions({
  getHeight: function (element) {
    const navHeader = 60
    return window.innerHeight - navHeader
  },
  getWidth: function (element) {
    return element.clientWidth
  }
})(PlansIndex)
