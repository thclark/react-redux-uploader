import React from 'react'
import PropTypes from 'prop-types'

// TODO remove size and status now they're not used for inline styles
const Placeholder = ({ className, image, size, status }) => {
  return (
    <div className={`${className || ''}`}>
      { image }
    </div>
  )
}

Placeholder.propTypes = {
  image: PropTypes.node.isRequired,
  size: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
}

export default Placeholder
