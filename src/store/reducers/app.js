/**
 * App store - app and platform level information
 *
 * @param {String} version
 * @param {String} email
 * @api public
 */

import C from '../../constants'
import Immutable from 'immutable'
import { createReducer } from '../../utils'
import plans from '../data/plans'

if (process.env.NODE_ENV === 'test') {
  global.__API_ROOT__ = ''
}

const initialState = Immutable.fromJS({
  isLoading: false,
  note: null,
  data: {
    platform: 'web',
    version: '0.0.1',
    API_ROOT: __API_ROOT__,
    plans: require('../data/plans.json'),
    prices: require('../data/prices.json'),
    regions: require('../data/regions.json')
  }
})

const internals = {
  /**
   * UPDATE_APP_STORE
   *
   * @param {Object} payload
   *  @param {Bool} isLoading
   *  @param {Object} error
   * @api public
   */
  [C.UPDATE_APP_STORE]: (state, payload) => {
    return state.mergeDeep(Immutable.fromJS(payload))
  },
  /**
   * UPDATE_APP
   *
   * @param {Object} payload - full machine data api
   * @api public
   */
  [C.UPDATE_APP]: (state, payload) => {
    return state.mergeDeepIn(['data'], Immutable.fromJS(payload))
  }
}

const AppReducer = createReducer(initialState, internals)

module.exports.AppReducer = AppReducer
module.exports.internals = internals
