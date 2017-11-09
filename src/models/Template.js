import type { Part } from './Part'

export type Template = {
  parts: Array<Part>
}

export const TEMPLATE_FIELD_TOKEN = '🍅'

export const textToHtml = (text: string) =>
  text.replace(/\n/g, '<br />');

export const serializeParts = (parts: Array<Part>) =>
    parts
      .map(part => part.isField ? TEMPLATE_FIELD_TOKEN : part.text)
      .join('')

export const serializePartsWithValues = (parts: Array<Part>) =>
  parts
    .map(({ isField, value, text }) => isField ? value : text)
    .join(' ')

export const ifThenElse = (input: any, expressionFn: Function, thenFn: Function, elseFn?: Function) =>
  (expressionFn(input))
    ? thenFn(input)
    : (elseFn && elseFn(input))

export const arrayWithoutLastItem = (array: Array<any>) =>
  array.slice(0, array.length - 1)

export const deserializeParts = (inputString: string) =>
  ifThenElse(
    inputString.split(TEMPLATE_FIELD_TOKEN),
    inputSplit => inputSplit.length > 1,
    inputSplit =>
      arrayWithoutLastItem(
        inputSplit
          .map(text => ({ text }))
          .reduce((accumulator, part) =>
            accumulator.concat([part, { text: '', isField: true }])
          , [])
      ),
    inputSplit => [{ text: inputSplit[0] }]
  )