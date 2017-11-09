import React from 'react'

import styled from 'styled-components'
import {
  gridSize,
  field,
  srOnly
} from './components.styles'
export const Input = styled.input`
  ${field}
  height: ${gridSize * 6}rem;`
export const Label = styled.label`
  ${srOnly}`

type Props = {
  id:         string,
  labelText:  string,
  onChange:   Function,
  className?: string,
  autoFocus:  bool,
  name?:      string,
  innerRef?:  Function,
  value?:     string
}

class Component extends React.Component<Props, {}> {
  static defaultProps = {
    id:        'firstName',
    labelText: 'First Name',
    onChange:  () => null,
    className: ''
  }

  render = () => {
    const { className, id, labelText, onChange, autoFocus, name, innerRef, value } = this.props
    return <div className={className}>
      <Label
        htmlFor={id}>{labelText}</Label>
      <Input
        type="text"
        id={id}
        onChange={onChange}
        autoFocus={autoFocus}
        name={name}
        innerRef={innerRef}
        defaultValue={value}
      />
    </div>
  }
}


export default Component