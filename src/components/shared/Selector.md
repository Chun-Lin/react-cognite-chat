```jsx
import React, { useState } from 'react'
import Selector from './Selector'

const [selectedValues, setSelectedValues] = useState()

const selectorChangeHandler = option => {
  setSelectedValues(option)
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'apple', label: 'Apple' },
]

;<Selector
  isMulti
  options={options}
  onChange={option => setSelectedValues(option)}
/>
```
