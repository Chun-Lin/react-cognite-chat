import React from 'react'
import Select from 'react-select'

const styles = {
  container: (styles) => ({
    ...styles,
    width: '100%',
  }),
  control: (styles) => ({
    ...styles,
    width: '100%',
    backgroundColor: 'white',
  }),
}

const Selector = ({ isMulti, options, ...rest }) => {
  return (
    <Select isMulti={isMulti} options={options} styles={styles} {...rest} />
  )
}

export default Selector
