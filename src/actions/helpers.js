import _ from 'lodash'

export default {
  /**
  * action handler
  *
  * format api error responses for the dropdown note component
  * note path getter for picking of response data
  */
  handler (next, path = 'body') {
    return (err, response) => {
      if (err) {
        next(err.message, null)
      } else {
        const data = _.get(response, path)
        next(err, data)
      }
    }
  },
  loadingAction (actionType, action, loadingType, message = '') {
    return {
      type: actionType,
      payload: {
        isLoading: {
          action,
          type: loadingType,
          message
        }
      }
    }
  },
  successNote (type, message, params = {}) {
    const note = Object.assign(
      {
        status: 200,
        autoClose: true,
        message
      },
      params
    )

    return {
      type,
      payload: {
        note
      }
    }
  },
  errorAndClear (type, error) {
    return [
      this.clearLoader(type),
      this.requestFailure(type, error)
    ]
  },
  requestFailure (type, error) {
    return {
      type,
      payload: {
        note: error
      }
    }
  },
  clearLoader (type) {
    return {
      type,
      payload: {
        isLoading: false
      }
    }
  }
}
