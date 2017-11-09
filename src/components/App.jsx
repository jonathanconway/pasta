import React from 'react'
import { Route, Redirect } from 'react-router'
import { NavLink }         from 'react-router-dom'
import { HashRouter }      from 'react-router-dom'
import styled              from 'styled-components'

import {
  gridSize
}                     from './components.styles'
const Main = styled.main`
  padding-bottom: ${gridSize * 8}rem;`

type Props = {
  Header: Function,
  Body: Function,
  Nav: Function
}

const Component = ({ Header, Body, Nav }: Props) => <Main>
  <Header />

  <Body />

  <Nav />
</Main>

Component.defaultProps = {
  Header: () => <header>Header</header>,
  Body:   () => <main>Body</main>,
  Nav:    () => <nav>Nav</nav>
}

export default Component