import React from 'react'

import { NavLink } from 'react-router-dom'

import styled from 'styled-components'
import { gridSize, baseFontSize, Row } from './commonStyles.jsx'
export const Nav = styled.nav`
  text-align: center;
  font-size: ${baseFontSize * 1.5}rem;
  margin-bottom: ${gridSize * 4}rem;
  display: inline-block;
  width: 100%;
`
export const NavStep = styled(NavLink)`
  color: initial;
  
  &:not(:last-child) {
    margin-right: 2rem;

    &:after {
      content: '➠';
      display: inline-block;
      margin-left: 2rem;
    }
  }

  &.active {
    text-decoration: underline;
  }
`

type Props = {
  activeStep: ?string
}

const activeClass = (activeStep: ?string, compare: string) =>
  (activeStep && activeStep === compare) ? 'active' : ''

export default ({ activeStep }: Props) => <Nav>
  <Row>
    <NavStep className={activeClass(activeStep, 'list')} to="/list">List</NavStep>
    <NavStep className={activeClass(activeStep, 'fill')} to="/fill">Fill</NavStep>
    <NavStep className={activeClass(activeStep, 'send')} to="/send">Send</NavStep>
  </Row>
</Nav>