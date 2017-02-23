import C from '../../constants'
import { combineReducers } from 'redux'
import { enableBatching } from 'redux-batched-actions'
import { AppReducer as app } from './app'
import { PlanReducer as plan } from './plan'
// App Reducers
import locationReducer from './location'

export const makeRootReducer = (asyncReducers) => {
  const appReducer = combineReducers({
    app,
    plan,
    location: locationReducer,
    ...asyncReducers
  })

  const resetStoreOnLogout = (state, action) => {
    /* Handle User Logout Pre Returning App Reducer */

    return appReducer(state, action)
  }

  /* returns single function to pass to create store */
  return enableBatching(resetStoreOnLogout)
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
