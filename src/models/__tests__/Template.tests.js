import { ifThenElse, arrayWithoutLastItem, deserializeParts, TEMPLATE_FIELD_TOKEN } from '../Template'

describe('ifThenElse', () => {
  it('runs the then block if expression evaluates to true', () => {
    const value = 'hello'

    const result =
      ifThenElse(
        value,
        value => value === 'hello',
        value => value + ' world!')

    expect(result).toEqual('hello world!')
  })
})

describe('arrayWithoutLastItem', () => {
  it('returns the array passed in, less its last item', () => {
    const value = [1,2]
    
    const result = arrayWithoutLastItem(value)

    expect(result).toEqual([1])
  })
})
  
describe('deserializeParts', () => {
  it('splits a string delimited by TEMPLATE_FIELD_TOKEN into appropriate parts', () => {
    const value = `Hello, ${TEMPLATE_FIELD_TOKEN}. My name is ${TEMPLATE_FIELD_TOKEN}.`

    const result = deserializeParts(value)

    expect(result).toEqual([
      { text: 'Hello, ' },
      { text: '', isField: true },
      { text: '. My name is ' },
      { text: '', isField: true },
      { text: '.' }
    ])
  })

  it('returns a single text-only part for a string without any TEMPLATE_FIELD_TOKENs', () => {
    const value = 'Hello, world.'

    const result = deserializeParts(value)

    expect(result).toEqual([
      { text: 'Hello, world.' }
    ])
  })
})