/**
 * Plan reducer
 *
 * @param {String} email
 * @param {Object} preferences
 * @api public
 */

import C from '../../constants'
import Immutable from 'immutable'
import { createReducer } from '../../utils'
import helpers from './helpers'

const initialState = Immutable.fromJS({
  isLoading: false,
  note: null,
  data: []
})

const internals = {
  /**
   * UPDATE_PLAN_STORE
   *
   * @param {Object} payload
   *  @param {Bool} isLoading
   *  @param {Object} error
   * @api public
   */
  [C.UPDATE_PLAN_STORE]: (state, payload) => {
    return state.merge(Immutable.fromJS(payload))
  },
  /**
   * SET_PLANS
   *
   * @param {Object} payload - array of doctors
   * @api public
   */
  [C.SET_PLANS]: (state, payload) => {
    return state.setIn(['data'], payload)
  }
}

const PlanReducer = createReducer(initialState, internals)

module.exports.PlanReducer = PlanReducer
module.exports.internals = internals
