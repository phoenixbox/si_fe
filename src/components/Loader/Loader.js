import React, {
  Component,
  PropTypes
} from 'react'
import styles from '../../utils/styles'
const Halogen = require('halogen/PulseLoader')

export default class Loader extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired
  }

  static defaultProps = {
    color: styles.colors.secondary,
    height: '10px'
  }

  render () {
    const {
      color,
      height,
      header
    } = this.props
    let headerComp
    if (header) {
      headerComp = (
        <div className="tc center">
          <h5>{header}</h5>
        </div>
      )
    }

    return (
      <div className='loader tc'>
        {headerComp}
        <Halogen color={this.props.color} size={height} margin='3px' />
      </div>
    )
  }
}
