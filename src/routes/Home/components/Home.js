import React, {
  Component,
  PropTypes
} from 'react'
import _ from 'lodash'
import classnames from 'classnames'
import styles from '../../../utils/styles'
import Slider from 'rc-slider'
import {
  PlansIndex,
  EmptyWell,
  Loader
} from '../../../components'

// Redux
import {
  fetchPlans
} from '../../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => {
  return {
    app: state.app.get('data').toJS(),
    plans: state.plan.toJS()
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      fetchPlans
    },
    dispatch
  )
})

class Home extends Component {
  constructor(props) {
    super(props)
    this.controlChange = this.controlChange.bind(this)
    this.inputHandler = this.inputHandler.bind(this)

    this.state = {
      age: null,
      zip_code: null,
      price: 0,
      slider: {
        step: 10,
        min: 0
      }
    }
  }

  controlChange (val) {
    this.setState({ price: val })
  }

  priceSlider() {
    const { plans } = this.props
    const {
      price,
      slider
    } = this.state
    let max = 0
    let disabled = true
    let description = `Enter an age an zip code to enable filters`
    if (plans.data.length) {
      description = `Adjust to filter plans by price`
      disabled = false
      max = parseInt(_.max(plans.data, 'monthly_premium').monthly_premium) + 1
    }

    const sliderClasses = classnames({
      'slider-wrapper': true,
      'bg-grey': disabled
    })

    const sliderProps = {
      style: {
        height: '30px',
        backgroundColor: 'transparent',
        width: '100%',
        margin: '0 auto'
      },
      value: price,
      orientation: 'horizontal',
      min: slider.min,
      max,
      step: slider.step,
      disabled,
      onChange: this.controlChange
    }


    return (
      <div className={sliderClasses}>
        <div className="f6 lh-copy">{description}</div>
        <Slider {...sliderProps}>
          <span className='handle-value'></span>
        </Slider>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      plans: prevPlans
    } = prevProps
    const {
      plans
    } = this.props

    const {
      age: prevAge,
      zip_code: prevZip,
    } = prevState
    const {
      age,
      zip_code
    } = this.state

    if (!plans.isLoading && age && zip_code) {
      const minReqMet = age && zip_code.length === 5
      const changed = age !== prevAge || zip_code !== prevZip

      if (minReqMet && changed) {
        const query = {age, zip_code}
        this.props.actions.fetchPlans(query)
      }
    }
  }


  inputHandler(e) {
    const target = e.currentTarget
    const updatedState = {}
    let value
    if (target.name === 'age' || target.name === 'zip_code') {
      const re = new RegExp(target.pattern)
      value = target.value.match(re)[0]
    }
    updatedState[target.name] = value
    this.setState(updatedState)
  }

  controlsBar () {
    const {
      age, zip_code
    } = this.state
    let sliderWrapStyles = {}
    const { plans } = this.props
    const inputProps = {
      type: 'number',
      className: 'f5 input-reset ba b--black-20 pa2 mb2 db w-100',
      onChange: this.inputHandler
    }
    const ageInputProps = Object.assign({name: 'age', pattern: '[0-9]{0,3}', max: "100", value: age}, inputProps)
    const zipInputProps = Object.assign({name: 'zip_code', pattern: '[0-9]{0,5}', value: zip_code}, inputProps)

    if (!plans.length) {
      sliderWrapStyles.backgroundColor = styles.colors.loading
    }

    return (
      <form className="pt2 black-80 bb b--black-40">
        <div className="ph2">
          <div className="">
            <label htmlFor="age" className="f6 b db mb2">Age</label>
            <input {...ageInputProps} />
          </div>
          <div className="">
            <label htmlFor="zip_code" className="f6 b db mb2">Zip Code</label>
            <input {...zipInputProps} />
          </div>
        </div>
        <div className="ph3 pt1 br2" style={sliderWrapStyles}>
          {this.priceSlider()}
        </div>
      </form>
    )
  }

  filteredPlans(data) {
    const {
      price
    } = this.state
    return data.filter((plan) => {
      return parseFloat(plan.monthly_premium) < price
    })
  }

  carrierOptions() {
    const { plans } = this.props
    const {age, zip_code, price} = this.state
    let content

    if (plans.isLoading) {
      content = <Loader header="Loading your plans..." />
    } else {
      if (age && zip_code && zip_code.length === 5) {
        if (plans.data.length) {
          let planData = plans.data

          if (price) {
            planData = this.filteredPlans(planData)
          }

          content = <PlansIndex plans={planData} />
        } else {
          content = <EmptyWell title='No plans match your age & zip code' />
        }
      } else {
        content = <EmptyWell title='Please enter your name and zip to get started' />
      }
    }
    return content
  }

  render () {
    const { app } = this.props

    return (
      <div className='flx mw6 w-100 w-80-m w-50-l' style={{margin: '0 auto'}}>
        {this.controlsBar()}
        {this.carrierOptions()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
