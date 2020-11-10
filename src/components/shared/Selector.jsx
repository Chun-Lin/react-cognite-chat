import PropTypes from 'prop-types'
import React from 'react'
import Select from 'react-select'

const styles = {
  container: styles => ({
    ...styles,
    width: '100%',
  }),
  control: styles => ({
    ...styles,
    width: '100%',
    backgroundColor: 'white',
  }),
}

const Selector = ({ isMulti, options, onChange, ...rest }) => {
  return (
    <Select
      isMulti={isMulti}
      options={options}
      onChange={onChange}
      styles={styles}
      {...rest}
    />
  )
}

Selector.propTypes = {
  isMulti: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
}

export default Selector
