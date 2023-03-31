import PropTypes from 'prop-types'

const ClearIcon = ({ className, onClick }) => {
  return (
    <svg
      fill="none"
      height={24}
      viewBox="0 0 24 24"
      width={24}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <g clipRule="evenodd" fill="rgb(0,0,0)" fillRule="evenodd">
        <path d="m8.66668 1c-.55229 0-1 .44772-1 1v2h-4.71429c-.55228 0-1 .44772-1 1s.44772 1 1 1h18.09521c.5523 0 1-.44772 1-1s-.4477-1-1-1h-4.619v-2c0-.55228-.4477-1-1-1zm1 2.85714v-.85714h4.76192v.85714z" />
        <path d="m19.9524 8h-16.00001v11.1667c0 2.1466 1.64993 3.8333 3.8 3.8333h8.40001c2.1501 0 3.8-1.6867 3.8-3.8333zm-9.3333 3.5234c0-.5522-.4478-1-1.00004-1-.55229 0-1 .4478-1 1v6.6667c0 .5523.44771 1 1 1 .55224 0 1.00004-.4477 1.00004-1zm4.7619 0c0-.5522-.4477-1-1-1s-1 .4478-1 1v6.6667c0 .5523.4477 1 1 1s1-.4477 1-1z" />
      </g>
    </svg>
  )
}

ClearIcon.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
}

export default ClearIcon
