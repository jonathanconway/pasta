import React       from 'react'
import { NavLink } from 'react-router-dom'

import routes      from '../routes'

import styled from 'styled-components'
import {
  gridSize,
  baseFontSize,
  Row
} from './components.styles'
export const Nav = styled.nav`
  display: inline-block;
  width: 100%;
  position: fixed;
  bottom: ${gridSize}rem;
  left: 0;
  box-sizing: border-box;

  text-align: center;
  font-size: ${baseFontSize * 1.5}rem;`
export const NavStep = styled(NavLink)`
  color: initial;
  text-decoration: none;
  text-align: center;
  font-family: 'Goudy Bookletter 1911', 'Times New Roman', serif;
  width: 6rem;

  &:nth-child(1),
  &:nth-child(3) {
    position: absolute;
  }
    
  &:nth-child(1) {
    left: ${gridSize}rem;
  }
  &:nth-child(2) {
  }
  &:nth-child(3) {
    right: ${gridSize}rem;
  }

  &:before {
    content: ' ';
    display: inline-block;
    border-radius: 100%;
    position: absolute;
    margin: auto;
    left: 50%;
    bottom: 2.5rem;

    width: 2rem;
    height: 2rem;
    margin-left: -1rem;
  }
  &.active:before {
    width: 4rem;
    height: 4rem;
    margin-left: -2rem;
  }

  ${Object.keys(routes).map(route =>
    '&.nav-step--' + route + ':before { background-color: ' + routes[route].color + '; }')}`

type Props = {
  activeStep: ?string
}

const activeClass = (activeStep: ?string, compare: string) =>
  [
    ((activeStep && activeStep === compare) ? 'active' : ''),
    ('nav-step--' + compare)
  ].join(' ')

export default ({ activeStep }: Props) => <Nav>
  <Row>
    <NavStep className={activeClass(activeStep, 'template')} to="/template">{'Template'}</NavStep>
    <NavStep className={activeClass(activeStep, 'fill'    )} to="/fill"    >{'Message' }</NavStep>
    <NavStep className={activeClass(activeStep, 'send'    )} to="/send"    >{'Send'    }</NavStep>
  </Row>
</Nav>