import type { Part } from '../models/Part'
import {
  getIndexOfNextFieldPart,
  getIndexOfPreviousFieldPart
} from '../selectors'

describe('getIndexOfNextFieldPart', () => {
  it('given a set of parts and an index, returns the index of the next field part', () => {
    const parts = (([
      { text: 'one' },
      { isField: true },
      { text: 'three' },
      { isField: true },
      { text: 'five' }
    ]): Array<Part>)

    const result = getIndexOfNextFieldPart(parts, 1)

    expect(result).toEqual(3)
  })

  it('given a set of parts and an index, with no fields following it, returns -1', () => {
    const parts = (([
      { text: 'one' },
      { isField: true },
      { text: 'three' }
    ]): Array<Part>)

    const result = getIndexOfNextFieldPart(parts, 1)

    expect(result).toEqual(-1)
  })

  it('given a set of 0 parts and an index, returns -1', () => {
    const parts = (([
    ]): Array<Part>)

    const result = getIndexOfNextFieldPart(parts, 1)

    expect(result).toEqual(-1)
  })
})

describe('getIndexOfPreviousFieldPart', () => {
  it('given a set of parts and an index, returns the index of the previous field part', () => {
    const parts = (([
      { text: 'one' },
      { isField: true },
      { text: 'three' },
      { isField: true },
      { text: 'five' }
    ]): Array<Part>)

    const result = getIndexOfPreviousFieldPart(parts, 3)

    expect(result).toEqual(1)
  })

  it(`given a set of parts and an index, where the next field part is directly
      before the current one, correclty returns the index of the previous
      field part`, () => {
    const parts = (([
      { text: 'one' },
      { text: 'two' },
      { isField: true },
      { isField: true },
      { text: 'five' }
    ]): Array<Part>)

    const result = getIndexOfPreviousFieldPart(parts, 3)

    expect(result).toEqual(2)
  })
})