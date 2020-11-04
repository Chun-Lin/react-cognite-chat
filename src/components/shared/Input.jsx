import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 0 10px;
  border: 1px solid
    ${(props) => (props.borderColor ? props.borderColor : '#979797')};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : '100px'};
  background-color: white;
  color: ${(props) => props.color};
  outline: none;
`

const Input = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  width,
  height,
  color,
  borderColor,
  borderRadius,
  ...rest
}) => {
  return (
    <StyledInput
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      width={width}
      height={height}
      color={color}
      borderColor={borderColor}
      borderRadius={borderRadius}
      {...rest}
    />
  )
}

export default Input
