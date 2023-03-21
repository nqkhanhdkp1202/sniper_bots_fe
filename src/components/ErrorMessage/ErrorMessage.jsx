import PropTypes from 'prop-types'
import './style.scss'

function ErrorMessage({ errors, name }) {
  const error = errors[name]
  return <div className="error-message">{error && error.message}</div>
}

ErrorMessage.propTypes = {
  errors: PropTypes.object,
  name: PropTypes.string
}

export default ErrorMessage
