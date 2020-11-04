import styled from 'styled-components'

export const Avatar = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  cursor: pointer;
`
