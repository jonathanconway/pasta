import React from 'react'

import styled from 'styled-components'
import { baseFontSize, gridSize, field } from './commonStyles'
export const Input = styled.input`
  ${field}
  
  height: ${gridSize * 6}rem;
`

type Props = {
  id: string,
  labelText: string,
  onChange: Function,
  className?: string,
  autoFocus: bool,
  name?: string,
  innerRef?: Function,
  value?: string
}

const Component = ({ className, id, labelText, onChange, autoFocus, name, innerRef, value }: Props) =>
  <div className={className}>
    <label
      htmlFor={id}
      className="sr-only">{labelText}</label>
    <Input
      type="text"
      id={id}
      onChange={onChange}
      autoFocus={autoFocus}
      name={name}
      innerRef={innerRef}
      value={value}
    />
  </div>

Component.defaultProps = {
  id: 'firstName',
  labelText: 'First Name',
  onChange: () => null,
  className: ''
}

export default Component