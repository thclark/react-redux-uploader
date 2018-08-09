import React, { Component } from 'react'
import PropTypes from 'prop-types'


const getButtonContent = (state, props) => {
  const { resumable } = state
  const { pauseChildren, resumeChildren } = props
  if (resumable) {
    return resumeChildren || 'Resume'
  }
  return pauseChildren || 'Pause'
}

const getButtonLabel = (state) => {
  const { resumable } = state
  return resumable ? 'resume' : 'pause'
}

class PauseResumeButton extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    onlyRenderIfEnabled: PropTypes.bool,
    pauseChildren: PropTypes.node,
    resumeChildren: PropTypes.node,
    uploader: PropTypes.object.isRequired,
  };

  static defaultProps = {
    onlyRenderIfEnabled: true,
  };

  constructor(props) {
    super(props)

    this.state = {

      atLeastOneChunkUploaded: false,
      pausable: false,
      resumable: false,
    }

    const statusEnum = props.uploader.qq.status

    this.onStatusChange = (id, oldStatus, newStatus) => {
      if (id === this.props.id && !this.unmounted) {
        const pausable = newStatus === statusEnum.UPLOADING && this.state.atLeastOneChunkUploaded
        const resumable = newStatus === statusEnum.PAUSED

        if (pausable !== this.state.pausable) {
          this.setState({ pausable })
        }
        if (resumable !== this.state.resumable) {
          this.setState({ resumable })
        }

        if (
          newStatus === statusEnum.DELETED
          || newStatus === statusEnum.CANCELED
          || newStatus === statusEnum.UPLOAD_SUCCESSFUL
        ) {
          this.unregisterOnResumeHandler()
          this.unregisterOnStatusChangeHandler()
          this.unregisterOnUploadChunkSuccessHandler()
        }
      }
    }

    this.onClick = () => {
      if (this.state.pausable) {
        this.props.uploader.methods.pauseUpload(this.props.id)
      } else if (this.state.resumable) {
        this.props.uploader.methods.continueUpload(this.props.id)
      }
    }

    this.onResume = (id) => {
      if (id === this.props.id
        && !this.unmounted
        && !this.state.atLeastOneChunkUploaded) {
        this.setState({
          atLeastOneChunkUploaded: true,
          pausable: true,
          resumable: false,
        })
      }
    }

    this.onUploadChunkSuccess = (id) => {
      if (id === this.props.id
        && !this.unmounted
        && !this.state.atLeastOneChunkUploaded) {
        this.setState({
          atLeastOneChunkUploaded: true,
          pausable: true,
          resumable: false,
        })
      }
    }
  }

  componentDidMount() {
    this.props.uploader.on('resume', this.onResume)
    this.props.uploader.on('statusChange', this.onStatusChange)
    this.props.uploader.on('uploadChunkSuccess', this.onUploadChunkSuccess)
  }

  componentWillUnmount() {
    this.unmounted = true
    this.unregisterOnResumeHandler()
    this.unregisterOnStatusChangeHandler()
    this.unregisterOnUploadChunkSuccessHandler()
  }

  unregisterOnResumeHandler() {
    this.props.uploader.off('resume', this.onResume)
  }

  unregisterOnStatusChangeHandler() {
    this.props.uploader.off('statusChange', this.onStatusChange)
  }

  unregisterOnUploadChunkSuccessHandler() {
    this.props.uploader.off('uploadChunkSuccess', this.onUploadChunkSuccess)
  }

  render() {
    const { onlyRenderIfEnabled, id, pauseChildren, resumeChildren, uploader, ...elementProps } = this.props

    if (this.state.pausable || this.state.resumable || !onlyRenderIfEnabled) {
      return (
        <button
          aria-label={getButtonLabel(this.state)}
          className={`${this.props.className || ''}`}
          disabled={!this.state.pausable && !this.state.resumable}
          onClick={this.onClick}
          type="button"
          {...elementProps}
        >
          { getButtonContent(this.state, this.props) }
        </button>
      )
    }

    return null
  }
}


export default PauseResumeButton
