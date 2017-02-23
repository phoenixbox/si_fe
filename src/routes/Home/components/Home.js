import React, {
  Component,
  PropTypes
} from 'react'
import Slider from 'rc-slider'
import {
  PlansIndex,
  Loader
} from '../../../components'
console.log('PLANSINDEX', PlansIndex)

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
      price: 0
    }
  }

  controlChange (val) {
    this.setState({ price: val })
  }

  priceSlider() {
    const control = {
      max: 1000,
      step: 10,
      min: 250
    }
    const { price } = this.state

    const sliderProps = {
      style: {
        height: '30px',
        backgroundColor: 'transparent',
        width: '100%',
        margin: '0 auto'
      },
      value: price,
      orientation: 'horizontal',
      min: control.min,
      max: control.max,
      step: control.step,
      disabled: false,
      withBars: true,
      onChange: this.controlChange
    }

    const description = 'Adjust to filter plans by price'

    return (
      <div className='slider-wrapper'>
        <div className="f6 lh-copy">{description}</div>
        <Slider {...sliderProps}>
          <span className='handle-value'></span>
        </Slider>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      age: prevAge,
      zip_code: prevZip
    } = prevState
    const {
      age,
      zip_code
    } = this.state
    const { plans } = prevProps

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
    const inputProps = {
      type: 'number',
      className: 'f5 input-reset ba b--black-20 pa2 mb2 db w-100',
      onChange: this.inputHandler
    }
    const ageInputProps = Object.assign({name: 'age', pattern: '[0-9]{0,3}', max: "100", value: age}, inputProps)
    const zipInputProps = Object.assign({name: 'zip_code', pattern: '[0-9]{0,5}', value: zip_code}, inputProps)

    return (
      <form className="pa2 black-80">
        <div className="measure">
          <label htmlFor="age" className="f6 b db mb2">Age</label>
          <input {...ageInputProps} />
        </div>
        <div className="measure">
          <label htmlFor="zip_code" className="f6 b db mb2">Zip Code</label>
          <input {...zipInputProps} />
        </div>
        <div className="measure">
          {this.priceSlider()}
        </div>
      </form>
    )
  }

  carrierOptions() {
    const { plans } = this.props
    const {age, zip_code} = this.state
    let content

    if (plans.isLoading) {
      content = <Loader header="Loading your plans..." />
    } else {
      if (age && zip_code && zip_code.length === 5) {
        if (plans.data.length) {
          console.log('PLANS.DATA.LENGTH', plans.data.length)
          content = <PlansIndex plans={plans.data} />
        } else {
          content = (
            <div className="tc center">
              <h5>No plans match your age & zip code</h5>
            </div>
          )
        }
      } else {
        content = (
          <div className="tc center">
            <h5>Please enter your name and zip to get started</h5>
          </div>
        )
      }
    }
    return content
  }

  render () {
    const { app } = this.props

    return (
      <div className='flx'>
        {this.controlsBar()}
        {this.carrierOptions()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
