import type { Part } from './Part'

export type Template = {
  parts: Array<Part>
}

export const TEMPLATE_FIELD_TOKEN = '🔳'

export const serializeParts = (parts: Array<Part>) =>
  parts
    .map(part => part.isField ? TEMPLATE_FIELD_TOKEN : part.text)
    .join(' ')

export const serializePartsWithValues = (parts: Array<Part>) =>
  parts
    .map(({ isField, value, text }) => isField ? value : text)
    .join(' ')

export const deserializeParts = (inputString: string) =>
  inputString
    .replace(/[ \t]{2,}/g, ' ')
    .split(' ')
    .map(text => 
      (text.indexOf(TEMPLATE_FIELD_TOKEN) > -1)
        ? { text: '', isField: true }
        : { text })
