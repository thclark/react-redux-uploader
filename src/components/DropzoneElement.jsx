import qq from 'fine-uploader/lib/dnd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'


class DropzoneElement extends Component {
  static propTypes = {
    children: PropTypes.node,
    dropActiveClassName: PropTypes.string,
    element: PropTypes.object,
    multiple: PropTypes.bool,
    onDropError: PropTypes.func,
    onProcessingDroppedFiles: PropTypes.func,
    onProcessingDroppedFilesComplete: PropTypes.func,
    uploader: PropTypes.object.isRequired,
  };

  static defaultProps = {
    dropActiveClassName: '',
  }

  componentDidMount() {
    this.registerDropzone()
  }

  componentDidUpdate() {
    this.registerDropzone()
  }

  componentWillUnmount() {
    if (this.qqDropzone) {
      this.qqDropzone.dispose()
    }
  }

  onDropError(errorCode, errorData) {
    console.error(errorCode, errorData)
    if (this.props.onDropError) {
      this.props.onDropError(errorCode, errorData)
    }
  }

  onProcessingDroppedFilesComplete(files) {
    this.props.uploader.methods.addFiles(files)

    if (this.props.onProcessingDroppedFilesComplete) {
      this.props.onProcessingDroppedFilesComplete(files)
    }
  }

  registerDropzone() {
    if (this.qqDropzone) {
      this.qqDropzone.dispose()
    }
    // TODO remove string ref
    const dropzoneEl = this.props.element || this.refs.dropZone

    this.qqDropzone = new qq.DragAndDrop({
      allowMultipleItems: this.props.multiple,
      callbacks: {
        dropError: this.onDropError.bind(this),
        processingDroppedFiles: this.props.onProcessingDroppedFiles || function() {},
        processingDroppedFilesComplete: this.onProcessingDroppedFilesComplete.bind(this),
      },
      classes: {
        dropActive: this.props.dropActiveClassName || '',
      },
      dropZoneElements: [dropzoneEl],
    })
  }

  render() {
    const { uploader, ...elementProps } = this.props
    // TODO sort out this elementProps mess
    // TODO remove deprecated string ref
    return (
      <div
        {...getElementProps(this.props)}
        className={`${this.props.className || ''}`}
        ref="dropZone"
      >
        { this.props.children }
      </div>
    )
  }
}

const getElementProps = (actualProps) => {
  const actualPropsCopy = { ...actualProps }
  const expectedPropNames = Object.keys(DropzoneElement.propTypes)
  expectedPropNames.forEach(expectedPropName => delete actualPropsCopy[expectedPropName])
  return actualPropsCopy
}

export default DropzoneElement
