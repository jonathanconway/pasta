import type { Part } from './models/Part'

export const getIndexOfNextFieldPart = (parts: Array<Part>, fromPartIndex: number) =>
  parts.indexOf(
    parts
      .filter((part, partIndex) =>
        partIndex > fromPartIndex && part.isField)[0])

const filterReverse = (array: Array<any>, iterator: Function) => {
  const results = []
  for (let i = (array.length - 1); i > -1; i--) {
    if (iterator(array[i], i)) {
      results.push(array[i])
    }
  }
  return results
}

export const getIndexOfPreviousFieldPart = (parts: Array<Part>, fromPartIndex: number) =>
  parts.indexOf(
    filterReverse(
      parts,
      (part, partIndex) =>
        partIndex < fromPartIndex && part.isField
    )[0])