import C from '../constants'

/*
* updateApp
*/
export function updateApp (payload) {
  return {
    type: C.UPDATE_APP,
    payload
  }
}

/**
* fetchAppData
*
*/
export function fetchAppData (API_ROOT, userID, params, callback = () => {}) {
  return (dispatch) => {
    dispatch(ActionHelpers.loadingAction(C.UPDATE_APP_STORE, 'update', 'user', 'Update user'))
    const USERS_URL = `${API_ROOT}/v1/users/${userID}`

    return request.put(USERS_URL)
    .withCredentials()
    .send(params)
    .on('error', (err) => {
      dispatch(
        batchActions(
          ActionHelpers.errorAndClear(C.UPDATE_APP_STORE, err)
        )
      )
    })
    .end((err, response) => {
      if (err) {
        dispatch(
          batchActions(
            ActionHelpers.errorAndClear(C.UPDATE_APP_STORE, err)
          )
        )
      } else {
        dispatch(
          batchActions([
            ActionHelpers.clearLoader(C.UPDATE_APP_STORE),
            updateApp(updateAttrs)
          ])
        )
      }
    })
  }
}
