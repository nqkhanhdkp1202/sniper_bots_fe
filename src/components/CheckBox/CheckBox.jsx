import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './checkbox.scss'

const CheckBox = props => {
  const [checked, setChecked] = useState(false)

  const handleCheckBox = () => {
    setChecked(!checked)
  }

  return (
    <>
      <div className="checkbox form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id={props.id}
          name={props.name}
          value={props.value}
          onChange={handleCheckBox}
        />
        <label className="form-check-label" htmlFor={props.id} children={props.title} />
      </div>
      <input
        type="text"
        disabled={!checked}
        style={{ display: `${props.writable ? 'block' : 'none'}` }}
      />
    </>
  )
}

CheckBox.propTypes = {
  title: PropTypes.string,
  writable: PropTypes.bool,
  value: PropTypes.string
}

export default CheckBox
