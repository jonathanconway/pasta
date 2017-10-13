import type { Message } from './Message'
import type { Template } from './Template'

export type State = {
  newMessage?: Message,
  templates: Array<Template>
}