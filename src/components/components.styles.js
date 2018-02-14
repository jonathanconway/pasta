import styled from 'styled-components'

export const gridSize = 0.5

export const baseFontSize = 1

export const Row = styled.div`
  margin-top: ${gridSize * 2}rem;`

export const button = `
  display: inline-block;
  height: ${gridSize * 6}rem;
  line-height: ${gridSize * 5.5}rem;
  font-size: ${baseFontSize * 1.3}rem;
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
    content: '✕';
  }

  &.icon:before {
    margin-right: ${gridSize / 2}rem;
  }

  &.icon--next:after {
    content: '⇨';
  }

  &.icon--back:before {
    content: '⇦';
  }

  &.icon--up:after {
    content: '⇧';
  }

  &.icon--edit:before {
    content: '✎';
    transform: rotate(82deg);
    display: inline-block;
  }

  &.icon--hide-text {
    text-indent: -10000rem;
    position: relative;

    &:before,
    &:after {
      left: 0;
      position: absolute;
      width: 100%;
      text-indent: 0;
    }
  }

  * {
    text-decoration: none;
    color: initial;
  }`

export const Button = styled.button`
  ${button}

  background-color: white;
  padding: 0 ${gridSize * 2}rem;`

export const NavLinkButton = styled.span`
  ${button}

  box-sizing: border-box;
  color: initial;
  text-decoration: none;`

export const textBubble = `
  border: solid 1px gray;
  border-radius: ${gridSize * 2}rem;
  padding: ${gridSize * 2}rem;
  font-size: ${baseFontSize * 1.2}rem;
  height: 3rem;
  overflow: scroll;
  background: white;
  line-height: ${gridSize * 3}rem;`

export const TextBubble = styled.div`
  ${textBubble}`

export const field = `
  border-radius: ${gridSize}rem;
  border: solid 1px gray;
  box-sizing: border-box;
  font-size: ${baseFontSize * 1.2}rem;
  padding: 0 ${gridSize * 2}rem;
  width: 100%;`

const marginBetweenInnerItems = `
  margin-left: ${gridSize}rem;
  margin-right: ${gridSize}rem;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }`

export const HorizontalRow = Row.extend`
  display: flex;
  justify-content: space-between;

  > * {
    flex: 1;
    ${marginBetweenInnerItems}
  }`

export const srOnly = `
  visibility: hidden;
  left: -10000rem;
  position: absolute;`