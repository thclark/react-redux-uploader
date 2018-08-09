import React, { Component } from 'react'
import PropTypes from 'prop-types'

import StyleableFileInput from './StyleableFileInput.jsx'


const onFilesSelected = function(onChangeEvent) {
  this.props.uploader.methods.addFiles(onChangeEvent.target)
  this.resetInput()
}

const newKey = () => Date.now()


class FileInput extends Component {
  static propTypes = {
    text: PropTypes.shape({
      selectFile: PropTypes.string,
      selectFiles: PropTypes.string,
    }),
    uploader: PropTypes.object.isRequired,
  };

  static defaultProps = {
    text: {
      selectFile: 'Select a File',
      selectFiles: 'Select Files',
    },
  }

  constructor() {
    super()
    this.state = { key: newKey() }
    this.onFilesSelected = onFilesSelected.bind(this)
  }

  resetInput() {
    this.setState({ key: newKey() })
  }

  render() {
    const { text, uploader, ...elementProps } = this.props // eslint-disable-line no-unused-vars

    return (
      <StyleableFileInput
        {...elementProps}
        key={this.state.key}
        onChange={this.onFilesSelected}
      >
        {
          this.props.children
            ? this.props.children
            : <span>{ elementProps.multiple ? text.selectFiles : text.selectFile }</span>
        }
      </StyleableFileInput>
    )
  }
}


export default FileInput
export { StyleableFileInput }
