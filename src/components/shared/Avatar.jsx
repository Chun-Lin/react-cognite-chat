import styled from 'styled-components'
import PropTypes from 'prop-types'

const Avatar = styled.img`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: ${props => props.borderRadius};
  cursor: pointer;
`

Avatar.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string,
  src: PropTypes.string,
}

/** @component */
export default Avatar
