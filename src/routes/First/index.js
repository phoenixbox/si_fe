export default (store) => ({
  path : 'first',

  getChildRoutes (partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Second').default(store),
      ])
    })
  },

  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const First = require('./components/First').default

      cb(null, First)
    }, 'first')
  }
})
