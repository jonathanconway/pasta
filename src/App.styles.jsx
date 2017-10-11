import styled from 'styled-components'

const gridSize = 0.5;
const baseFontSize = 1;

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

  * {
    color: initial;
    text-decoration: none;
  }

  &.icon:after {
    margin-left: ${gridSize / 2}rem;
    display: inline-block;
  }

  &.icon--next:after {
    content: '⇨';
  }

  &.icon--finish:after {
    content: '✔';
  }
`

export const Nav = styled.nav`
  text-align: center;
  font-size: ${baseFontSize * 1.5}rem;
  margin-bottom: ${gridSize * 4}rem;
  display: inline-block;
  width: 100%;
`

export const NavBackButton = Button.extend`
  position: absolute;
  left: ${gridSize}rem;
  bottom: ${gridSize}rem;

  &:before {
    content: '⇦';
    margin-right: ${gridSize}rem;
    display: inline-block;
  }
`

export const NavStep = styled.span`
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

export const TemplateList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

export const InfoAlert = styled.div`
  border-radius: 100%;
  font-size: ${baseFontSize * 1.5}rem;
  border: solid 1px pink;
  border-bottom-width: 3px;
  border-right-width: 3px;
  color: purple;
  width: 70%;
  padding: ${gridSize * 2}rem;
  float: right;
  text-align: center;
  margin: 1rem;
`

const TextBubble = styled.div`
  border: solid 1px gray;
  border-radius: ${gridSize * 2}rem;
  padding: ${gridSize * 2}rem;
  font-size: ${baseFontSize * 1.2}rem;
`

export const Template = TextBubble.extend`
  a {
    text-decoration: none;
    color: initial;    
  }
`

export const Row = styled.div`
  margin-top: ${gridSize * 2}rem;
`

export const Input = styled.input`
  border-radius: ${gridSize}rem;
  border: solid 1px gray;
  height: ${gridSize * 6}rem;
  box-sizing: border-box;
  font-size: ${baseFontSize * 1.2}rem;
  padding: 0 ${gridSize * 2}rem;
`

export const FieldInput = Input.extend`
  width: 70%;
`

export const RecipientInput = Input.extend`
  width: 100%;
`

export const TemplateText = styled.span`
`

export const TemplateField = styled.span`
  margin: 0 ${gridSize}rem;
  padding: 0 ${gridSize}rem;
  border: solid 2px;
  border-color: silver;
  border-radius: ${gridSize}rem;

  &.active {  
    border-color: maroon;
    background-color: yellow;
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

export const Message = TextBubble.extend`
`










