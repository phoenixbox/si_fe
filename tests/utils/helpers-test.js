import helpers from '../../src/utils/helpers'
import { assert } from 'chai'

describe('(Utils) helpers', () => {
  it('returns test value', () => {
    const result = helpers.testHelper()
    assert.equal(result, 'test')
  })
})
