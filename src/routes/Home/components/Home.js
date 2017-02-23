import React, {
  Component,
  PropTypes
} from 'react'

// Redux
import actions from '../../../actions'
const {
  fetchDoctors
} = actions
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => {
  return {
    app: state.app.get('data').toJS()
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
    },
    dispatch
  )
})

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      age: null,
      zip: null
    }

  }

  filtersBar() {
    const {
      age, zip
    } = this.props

    return (
      <ul className='list bb b--black-10 pv2'>
        <li className='dib'>
          <label>Age</label>
          <input type='number' pattern='[0-9]*' onChange={(e) => {
              this.setState({age: e.currentTarget.value})
            }} value={age} />
        </li>
        <li className='dib'>
          <label>Zip</label>
            <input type='number' pattern='[0-9]*' onChange={(e) => {
                this.setState({zip: e.currentTarget.value})
              }} value={zip} />
        </li>
      </ul>
    )
  }

  carrierOptions() {
    const { plans, prices, regions } = this.props
    const {age, zip} = this.state
    let content

    if (age && zip) {
      const matchingNodes = helpers.matchingCarriers()

      const nodes = Array(4).fill({carrier: 'Aetna'}).map((node, nodeIx) => {
        return (
          <article key={nodeIx} className="dt w-100 bb b--black-05 pb2 mt2" href="#0">
            <div className="dtc w2 w3-ns v-mid">
              <img src="http://mrmrs.io/photos/p/2.jpg" className="ba b--black-10 db br-100 w2 w3-ns h2 h3-ns"/>
            </div>
            <div className="dtc v-mid pl3">
              <h1 className="f6 f5-ns fw6 lh-title black mv0">{node.carrier}</h1>
            </div>
            <div className="dtc v-mid">
              <form className="w-100 tr">
                <button className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60" type="submit">+ Follow</button>
              </form>
            </div>
          </article>
        )
      })
      content = <ul className='list'>{nodes}</ul>
    } else {
      content = (
        <div className="tc center">
          <h5>Please enter your name and zip to get started</h5>
        </div>
      )
    }
    return content
  }

  render () {
    const { app } = this.props

    return (
      <div className='flx'>
        {this.filtersBar()}
        {this.carrierOptions()}
        <button className="app__button fw5 mw5 center mt5">Click Me</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
