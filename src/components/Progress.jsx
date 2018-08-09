import React, { Component } from 'react'
import PropTypes from 'prop-types'


const isUploadComplete = (statusToCheck, statusEnum) => (
  statusToCheck === statusEnum.UPLOAD_FAILED
  || statusToCheck === statusEnum.UPLOAD_SUCCESSFUL
  || statusToCheck === statusEnum.CANCELED
)


class Progress extends Component {
  static propTypes = {
    id: PropTypes.number,
    hideBeforeStart: PropTypes.bool,
    hideOnComplete: PropTypes.bool,
    uploader: PropTypes.object.isRequired,
  };

  static defaultProps = {
    hideBeforeStart: true,
    hideOnComplete: true,
  };

  constructor(props) {
    super(props)

    this.state = {
      bytesUploaded: null,
      hidden: props.hideBeforeStart,
      totalSize: null,
    }

    this.createEventHandlers()
  }

  componentDidMount() {
    if (this.isTotalProgress) {
      this.props.uploader.on('totalProgress', this.trackProgressEventHandler)
    }
    else {
      this.props.uploader.on('progress', this.trackProgressEventHandler)
    }

    this.props.uploader.on('statusChange', this.trackStatusEventHandler)
  }

  componentWillUnmount() {
    this.unmounted = true
    this.unregisterEventHandlers()
  }

  get isTotalProgress() {
    return this.props.id == null
  }

  unregisterEventHandlers() {
    if (this.isTotalProgress) {
      this.props.uploader.off('totalProgress', this.trackProgressEventHandler)
    } else {
      this.props.uploader.off('progress', this.trackProgressEventHandler)
    }

    this.props.uploader.off('statusChange', this.trackStatusEventHandler)
  }

  createEventHandlers() {
    if (this.isTotalProgress) {
      this.trackProgressEventHandler = (bytesUploaded, totalSize) => {
        this.setState({ bytesUploaded, totalSize })
      }
    } else {
      this.trackProgressEventHandler = (id, name, bytesUploaded, totalSize) => {
        if (id === this.props.id) {
          this.setState({ bytesUploaded, totalSize })
        }
      }
    }

    const statusEnum = this.props.uploader.qq.status

    this.trackStatusEventHandler = (id, oldStatus, newStatus) => {
      if (!this.unmounted) {
        if (this.isTotalProgress) {
          if (!this.state.hidden
            && this.props.hideOnComplete
            && isUploadComplete(newStatus, statusEnum)
            && !this.props.uploader.methods.getInProgress()) {

            this.setState({ hidden: true })
          } else if (this.state.hidden && this.props.uploader.methods.getInProgress()) {
            this.setState({ hidden: false })
          }
        } else if (id === this.props.id) {
          if (this.state.hidden && newStatus === statusEnum.UPLOADING) {
            this.setState({ hidden: false })
          } else if (!this.state.hidden && this.props.hideOnComplete && isUploadComplete(newStatus, statusEnum)) {
            this.setState({ hidden: true })
          }
        }
      }
    }
  }

  render() {
    const percentWidth = (this.state.bytesUploaded / this.state.totalSize) * 100 || 0

    if (this.props.children) {
      // Render whatever child you want, which will receive a value prop according to the percent complete
      return (
        <div>
          {React.cloneElement(this.props.children, {
            value: `${percentWidth}`,
          })}
        </div>
      )
    }
    return (
      // Render a default progress bar, stylable by passing in the className prop
      <div hidden={this.state.hidden}>
        <div
          aria-valuemax="100"
          aria-valuemin="0"
          aria-valuenow={percentWidth}
          className={`${this.props.className || ''}`}
          role="progressbar"
          style={{ width: `${percentWidth} %` }}
        />
      </div>
    )
  }
}

export default Progress
