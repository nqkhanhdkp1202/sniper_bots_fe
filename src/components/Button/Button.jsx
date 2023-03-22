import React from 'react'
import PropTypes from 'prop-types'
import './button.scss'

const Button = props => {
  return (
    <button
      className={`btn ${props.className}`}
      onClick={props.onClick ? props.onClick : null}
      children={props.children}
    />
  )
}

Button.propTypes = {
  onClick: PropTypes.func
}

export default Button
