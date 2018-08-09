import React from 'react'

const StyleableFileInput = ({ children, className, onChange, ...params }) => (
  <div className={`${className || ''}`} >
    { children }
    <input
      {...params}
      onChange={onChange}
      type="file"
    />
  </div>
)

export default StyleableFileInput
