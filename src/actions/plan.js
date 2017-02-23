import C from '../constants'
import ActionHelpers from './helpers'
import { batchActions } from 'redux-batched-actions'
import request from 'superagent'

function setPlans(payload) {
  return {
    type: C.SET_PLANS,
    payload
  }
}
/**
* fetchPlans
*
*/
export function fetchPlans (query) {
  return (dispatch) => {
    dispatch(ActionHelpers.loadingAction(C.UPDATE_PLAN_STORE, 'fetch', 'plans', 'Fetch Plans'))
    const PLANS_URL = `${__API_ROOT__}/v1/plans`

    return request.get(PLANS_URL)
    .query(query)
    .on('error', (err) => {
      dispatch(
        batchActions(ActionHelpers.errorAndClear(C.UPDATE_PLAN_STORE, err))
      )
    })
    .end((err, response) => {
      if (err) {
        dispatch(
          batchActions(ActionHelpers.errorAndClear(C.UPDATE_PLAN_STORE, err))
        )
      } else {
        dispatch(
          batchActions([
            ActionHelpers.clearLoader(C.UPDATE_PLAN_STORE),
            setPlans(response.body)
          ])
        )
      }
    })
  }
}
