export default (store) => ({
  path: 'second',

  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Second'))
    }, 'second')
  }
})
