import React from 'react'
import styled from 'styled-components'

const DobleAvatarContainer = styled.div`
  /* display: flex; */
  position: relative;
  width: ${props => props.width}px;
  height: ${props => props.height}px;

  img {
    &:first-child {
      width: ${props => (props.width * 2) / 3}px;
      height: ${props => (props.height * 2) / 3}px;
      position: absolute;
      top: ${props => props.height / 3}px;
      left: 0;
      border-radius: 999px;
    }

    &:nth-child(2) {
      width: ${props => (props.width * 2) / 3}px;
      height: ${props => (props.height * 2) / 3}px;
      position: absolute;
      top: 0;
      left: ${props => props.width / 3}px;
      margin-right: -10px;
      border-radius: 999px;
    }
  }
`

const DoubleAvatar = ({ photoURLs, width, height }) => {
  return (
    <DobleAvatarContainer width={width} height={height}>
      <img src={photoURLs[0]} alt="avatar1" />
      <img src={photoURLs[1]} alt="avatar2" />
    </DobleAvatarContainer>
  )
}

export default DoubleAvatar
