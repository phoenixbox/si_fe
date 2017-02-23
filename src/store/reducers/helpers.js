import Immutable from 'immutable'

export default {
  actionAtIndex: (action, state, path, id, idKey, payload) => {
    const data = state.getIn(path)
    if (data) {
      const targetIndex = data.findIndex((pkg) => {
        return pkg.getIn(idKey) === id
      })

      if (targetIndex >= 0) {
        const setPath = path.concat(targetIndex)
        state = state[`${action}In`](setPath, Immutable.fromJS(payload))
      }
    }

    return state
  },
  setIn: (state, path, idKey, payload) => {
    let data = state.getIn(path)
    for (let i = 0; i < payload.length; i++) {
      const model = payload[i]

      const modelIx = data.findIndex((storeRoom) => {
        return storeRoom.get(idKey) === model.id
      })

       // Replace found plans
      if (modelIx >= 0) {
        data = data.setIn([modelIx], Immutable.fromJS(model))
      } else {
         // Add plans which have not been found
        data = data.push(Immutable.fromJS(model))
      }
      state = state.setIn(path, data)
    }

    return state
  }
}
