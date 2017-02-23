import React, {
  Component,
  PropTypes
} from 'react'
// Components
import ReactList from 'react-list'
import { PlanCard } from '..'
import Dimensions from 'react-dimensions'
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
      <div className='bb b--black-10 bg-white' key={key}>
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

    return (
      <div style={wrapperStyles}>
        <ReactList
          itemRenderer={this.renderRow}
          length={plans.length}
          type='variable' />
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
