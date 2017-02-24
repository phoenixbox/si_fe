import React, {
  Component,
  PropTypes
} from 'react'

export default class Header extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render () {
    return (
      <nav className='dt w-100 border-box pa1 pa3-ns ph2-ns bb b--black-40'>
        <div className='dtc v-mid mid-gray link w-30 pointer' title='Home'>
          <div className='flex'>
            <div className="f5">SimplyInsured</div>
          </div>
        </div>
      </nav>
    )
  }
}
