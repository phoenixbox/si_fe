import React, {
  PropTypes,
  Component
} from 'react';

export default class PlanCard extends Component {
  static propTypes = {
    carrier: PropTypes.string,
    monthly_premium: PropTypes.string,
    name: PropTypes.string,
    plan: PropTypes.shape({
      ambulance: PropTypes.string,
      application_fee: PropTypes.string,
      baby_care: PropTypes.string,
      brand_drugs: PropTypes.string,
      carrier: PropTypes.string,
      chiropractic: PropTypes.string,
      coinsurance: PropTypes.string,
      deductible: PropTypes.string,
      emergency_room: PropTypes.string,
      generic_drugs: PropTypes.string,
      hospitalization: PropTypes.string,
      hsa_eligible: PropTypes.string,
      labor: PropTypes.string,
      lifetime_maximum: PropTypes.string,
      mail_order_drugs: PropTypes.string,
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
      plan_type: PropTypes.string,
      prenatal_office_visit: PropTypes.string,
      separate_rx_deductible: PropTypes.string,
      specialist_referrals_required: PropTypes.string,
      specialist_visit: PropTypes.string,
      specialty_drugs: PropTypes.string,
      substance_abuse: PropTypes.string,
      surgery: PropTypes.string,
      urgent_care: PropTypes.string,
      xray: PropTypes.string
    })
  }

  render() {
    const {
      name
    } = this.props
    console.log('THIS.PROPS', this.props)

    return (
      <h1>{name}</h1>
    )
  }
}
