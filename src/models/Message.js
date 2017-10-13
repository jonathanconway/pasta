import type { Template } from './Template'

export type Message = {
  template: Template,
  recipient: ?string
}