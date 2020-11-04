import styled from 'styled-components'

export const Button = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  border-radius: ${(props) => props.borderRadius};
  border: ${(props) => props.border};
  background-color: ${(props) => props.backgroundColor};

  outline: none;
  cursor: pointer;
`
