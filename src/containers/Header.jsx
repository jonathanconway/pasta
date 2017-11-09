import React     from 'react'
import { Route } from 'react-router'
import styled    from 'styled-components'

import routes   from '../routes'

import {
  baseFontSize,
  gridSize
}               from '../components/components.styles'
const Container = styled.div`
  height: ${gridSize * 8}rem;`
const Header = styled.header`
  margin: 0;
  width: 100%;
  position: fixed;
  left: 0;
  top: -${gridSize * 5}rem;
  border-radius: ${gridSize * 4}rem;
  box-sizing: border-box;
  text-align: center;
  padding: ${gridSize * 5}rem ${gridSize * 2}rem ${gridSize / 4}rem ${gridSize * 2}rem;`
const ScreenTitle = styled.h2`
  font-size: ${baseFontSize * 2}rem;
  margin: ${gridSize / 2}rem;
  text-align: center;
  color: black;`

const Component = () =>
  <Route path="/:activeStep" render={({ match: { params: { activeStep } } }) => (
    <Container>
      <Header style={{backgroundColor: routes[activeStep || ''].color}}>
        <ScreenTitle>{routes[activeStep || ''].title}</ScreenTitle>
      </Header>
    </Container>
  )} />

export default Component