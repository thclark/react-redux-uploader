import React, { Component } from 'react'
import PropTypes from 'prop-types'


const isCancelable = (statusToCheck, statusEnum) => {
  return [
    statusEnum.DELETE_FAILED,
    statusEnum.PAUSED,
    statusEnum.QUEUED,
    statusEnum.UPLOAD_RETRYING,
    statusEnum.SUBMITTED,
    statusEnum.UPLOADING,
    statusEnum.UPLOAD_FAILED,
  ].indexOf(statusToCheck) >= 0
}


class CancelButton extends Component {
  static propTypes = {
    children: PropTypes.node,
    id: PropTypes.number.isRequired,
    onlyRenderIfCancelable: PropTypes.bool,
    uploader: PropTypes.object.isRequired,
  };

  static defaultProps = {
    onlyRenderIfCancelable: true,
  };

  constructor(props) {
    super(props)

    this.state = { cancelable: true }

    const statusEnum = props.uploader.qq.status

    this.onStatusChange = (id, oldStatus, newStatus) => {
      if (id === this.props.id && !this.unmounted) {
        if (!isCancelable(newStatus, statusEnum) && this.state.cancelable) {
          this.setState({ cancelable: false })
        } else if (isCancelable(newStatus, statusEnum) && !this.state.cancelable) {
          this.setState({ cancelable: true })
        } else if (newStatus === statusEnum.DELETED || newStatus === statusEnum.CANCELED) {
          this.unregisterStatusChangeHandler()
        }
      }
    }

    this.onClick = () => this.props.uploader.methods.cancel(this.props.id)
  }

  componentDidMount() {
    this.props.uploader.on('statusChange', this.onStatusChange)
  }

  componentWillUnmount() {
    this.unmounted = true
    this.unregisterStatusChangeHandler()
  }

  unregisterStatusChangeHandler() {
    this.props.uploader.off('statusChange', this.onStatusChange)
  }

  render() {
    const { children, onlyRenderIfCancelable, id, uploader, ...elementProps } = this.props
    const content = children || 'Cancel'

    if (this.state.cancelable || !onlyRenderIfCancelable) {
      return (
        <button
          aria-label="cancel"
          className={`${this.props.className || ''}`}
          disabled={!this.state.cancelable}
          onClick={this.state.cancelable ? this.onClick : undefined}
          type="button"
          {...elementProps}
        >
          { content }
        </button>
      )
    }

    return null
  }
}


export default CancelButton
