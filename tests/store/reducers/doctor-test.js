import Immutable from 'immutable'
import { assert } from 'chai'
import { internals as Doctor } from '../../../src/store/reducers/doctor'

describe('reducers/doctor', function () {
  describe('actions', () => {
    describe('UPDATE_DOCTOR_STORE', () => {
      it('sets the \'loading\' state', () => {
        const state = Immutable.fromJS({
          isLoading: false,
          error: null,
          data: {}
        })

        const payload = {
          isLoading: true
        }
        const result = Doctor.UPDATE_DOCTOR_STORE(state, payload).toJS()
        assert.isTrue(result.isLoading)
      })
      it('updates the \'error\' state of the store', () => {
        const state = Immutable.fromJS(
          {
            isLoading: false,
            error: new Error('an error'),
            data: []
          }
        )
        const payload = {
          error: null
        }
        const result = Doctor.UPDATE_DOCTOR_STORE(state, payload).toJS()
        assert.isNull(result.error)
      })
    })
    describe('SET_DOCTORS', () => {
      it('adds orgs not found into the store', () => {
        const state = Immutable.fromJS({
          isLoading: false,
          error: null,
          data: []
        })

        const payload = [
          {
            id: 1
          },
          {
            id: 2
          }
        ]

        const result = Doctor.SET_DOCTORS(state, payload).toJS()
        const target = {
          isLoading: false,
          error: null,
          data: [
            {
              id: 1
            },
            {
              id: 2
            }
          ]
        }
        assert.deepEqual(result, target)
      })
      it('replaces orgs found into the store', () => {
        const state = Immutable.fromJS({
          isLoading: false,
          error: null,
          data: [
            {
              id: 1,
              email: 'thing@bing.com'
            }
          ]
        })

        const payload = [
          {
            id: 1,
            email: 'bing@thing.com'
          },
          {
            id: 2,
            email: 'beep@boop.com'
          }
        ]

        const result = Doctor.SET_DOCTORS(state, payload).toJS()
        const target = {
          isLoading: false,
          error: null,
          data: [
            {
              id: 1,
              email: 'bing@thing.com'
            },
            {
              id: 2,
              email: 'beep@boop.com'
            }
          ]
        }
        assert.deepEqual(result, target)
      })
    })
  })
})
