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
    minHeight: '30px',
    height: '30px',
    backgroundColor: 'white',
    border: '1px solid #979797',
    borderRadius: '100px',
  }),
  valueContainer: styles => ({
    ...styles,
    height: '30px',
  }),
  placeholder: styles => ({
    ...styles,
    fontSize: '14px',
  }),
  indicatorsContainer: styles => ({
    ...styles,
    height: '30px',
    alignItems: 'center',
  }),
  multiValue: styles => ({
    ...styles,
    borderRadius: '50px',
  }),
  multiValueRemove: styles => ({
    ...styles,
    borderTopRightRadius: '50px',
    borderBottomRightRadius: '50px',
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
