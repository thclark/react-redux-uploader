/**
 * @class ExampleComponent
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import uploaderActions from './actions'
// import uploaderReducers from './reducers'
import {
  Dropzone,
  FileCancelButton,
  FileDeleteButton,
  FileInput,
  FileName,
  FilePauseResumeButton,
  FileRetryButton,
  FileSize,
  FileStatus,
  FileThumbnail,
  Progress,
} from './components'

export default class ExampleComponent extends Component {
  static propTypes = {
    text: PropTypes.string,
  }
  static defaultProps = {
    text: 'A default string to show',
  }

  render() {
    return (
      <div>
        Example Component: {this.props.text}
      </div>
    )
  }
}

export {
  // uploaderActions,
  // uploaderReducers,
  Dropzone,
  FileCancelButton,
  FileDeleteButton,
  FileInput,
  FileName,
  FilePauseResumeButton,
  FileRetryButton,
  FileSize,
  FileStatus,
  FileThumbnail,
  Progress,
}
