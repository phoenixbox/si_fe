import React, {
  PropTypes,
  Component
} from 'react'
import _ from 'lodash'
import classnames from 'classnames'

class PlanCard extends Component {
  static propTypes = {
    carrier: PropTypes.string,
    monthly_premium: PropTypes.string,
    name: PropTypes.string,
    plan: PropTypes.shape({
      carrier: PropTypes.string,
      plan_type: PropTypes.string,
      application_fee: PropTypes.string,
      ambulance: PropTypes.string,
      baby_care: PropTypes.string,
      chiropractic: PropTypes.string,
      coinsurance: PropTypes.string,
      deductible: PropTypes.string,
      emergency_room: PropTypes.string,
      hospitalization: PropTypes.string,
      hsa_eligible: PropTypes.string,
      labor: PropTypes.string,
      lifetime_maximum: PropTypes.string,
      mental_health: PropTypes.string,
      name: PropTypes.string,
      obgyn_exam: PropTypes.string,
      oon_authorization: PropTypes.string,
      oon_coinsurance: PropTypes.string,
      oon_coverage: PropTypes.string,
      oon_deductible: PropTypes.string,
      oon_oop_limit: PropTypes.string,
      oop_limit: PropTypes.string,
      out_of_country: PropTypes.string,
      pcp_required: PropTypes.string,
      pcp_visit: PropTypes.string,
      periodic_exam: PropTypes.string,
      prenatal_office_visit: PropTypes.string,
      separate_rx_deductible: PropTypes.string,
      specialist_referrals_required: PropTypes.string,
      specialist_visit: PropTypes.string,
      brand_drugs: PropTypes.string,
      generic_drugs: PropTypes.string,
      mail_order_drugs: PropTypes.string,
      specialty_drugs: PropTypes.string,
      substance_abuse: PropTypes.string,
      surgery: PropTypes.string,
      urgent_care: PropTypes.string,
      xray: PropTypes.string
    })
  }

  topLevelStats () {
    const { name } = this.props
    const {
      deductible
    } = this.props.plan
    const planKeys = ['name', 'deductible', 'urgent_care', 'xray', 'surgery', 'emergency_room', 'generic_drugs']
    const infoNodes = planKeys.map((key, ix) => {
      const label = _.startCase(key.replace(/_/g,' '))
      let classes = classnames({
        "fl fn-l w-100 dib-l w-auto-l mr5-l": true,
        "mt2": ix > 0
      })
      return (
        <div key={key} className={classes}>
          <div className="f5 fw6 ml0 black-60">{label}</div>
          <div className="f6 fw4 ml0 mt1">{this.props.plan[key]}</div>
        </div>
      )
    })
    return (
      <div className="cf">
        {infoNodes}
      </div>
    )
  }

  render() {
    const {
      name,
      carrier,
      monthly_premium
    } = this.props

    const priceSplit = monthly_premium.split('.')

    return (
      <article className="center br3 hidden ba b--black-10 mv1">
        <div className="bg-near-white br3 br--top black-60 mv0 pv2 ph2 flx flx-row space-between">
          <div className="flx f4 fw6">{carrier}</div>
          <div className="flx f4 tr flx-row">
            <div className="flx fw5">{`$${priceSplit[0]}`}</div>
            <div className="f6">
              {`.${priceSplit[1]}`}
            </div>
          </div>
        </div>
        <div className="pa2 bt b--black-10">
          {this.topLevelStats()}
        </div>
      </article>
    )
  }
}
module.exports = PlanCard
