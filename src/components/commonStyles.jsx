import styled from 'styled-components'

export const gridSize = 0.5

export const baseFontSize = 1

export const Row = styled.div`
  margin-top: ${gridSize * 2}rem;
`

const button = `
  display: inline-block;
  height: ${gridSize * 6}rem;
  line-height: ${gridSize * 5.5}rem;
  font-size: ${baseFontSize * 1.5}rem;
  text-align: center;
  
  border-left: solid 1px gray;
  border-right: solid 3px gray;
  border-top: solid 1px gray;
  border-bottom: solid 3px gray;
  border-radius: ${gridSize}rem;

  &.button--small {
    font-size: ${baseFontSize}rem;
    line-height: ${gridSize * 2}rem;
    padding: 0 0.5rem;
    height: ${gridSize * 4}rem;
  }

  &.icon:after {
    margin-left: ${gridSize / 2}rem;
  }

  &.icon--delete:before {
    content: '🗑';
  }

  &.icon:before {
    margin-right: ${gridSize / 2}rem;
  }

  &.icon--next:after {
    content: '⇨';
  }

  &.icon--finish:after {
    content: '✔';
  }

  &.icon--back:before {
    content: '←';
  }

  &.icon--up:after {
    content: '↑';
  }

  * {
    text-decoration: none;
    color: initial;
  }
`

export const Button = styled.button`
  ${button}

  background-color: white;
  padding: 0 ${gridSize * 2}rem;
`

export const NavLinkButton = styled.span`
  ${button}

  box-sizing: border-box;
  vertical-align: top;
  width: 27%;
  margin-left: ${gridSize}rem;

  color: initial;
  text-decoration: none;
`

export const TextBubble = styled.div`
  border: solid 1px gray;
  border-radius: ${gridSize * 2}rem;
  padding: ${gridSize * 2}rem;
  font-size: ${baseFontSize * 1.2}rem;
`

export const FieldPart = styled.span`
  margin: 0 ${gridSize}rem;
  padding: 0 ${gridSize}rem;
  border: solid 2px;
  border-color: silver;
  border-radius: ${gridSize}rem;
`

export const field = `
  border-radius: ${gridSize}rem;
  border: solid 1px gray;
  box-sizing: border-box;
  font-size: ${baseFontSize * 1.2}rem;
  padding: 0 ${gridSize * 2}rem;
  width: 100%;
`

export const infoAlert = `
  border-radius: 100%;
  font-size: ${baseFontSize * 1.5}rem;
  border: solid 1px pink;
  border-bottom-width: 3px;
  border-right-width: 3px;
  color: purple;
  width: 70%;
  padding: ${gridSize * 2}rem;
  text-align: center;
  margin: 1rem;
`

export const InfoAlert = styled.div`
  ${infoAlert}
  float: right;
}
`

export const ThreeButtonRow = Row.extend`
  > * {
    width: 31%;
    box-sizing: border-box;
    display: inline-block;
    margin-left: 0;

    &:not(last-child) {
      margin-right: ${gridSize}rem;
    }
  }
`