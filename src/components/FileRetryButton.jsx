import React, { Component } from 'react'
import PropTypes from 'prop-types'


const isRetryForbidden = (response, uploader) => {
  const preventRetryResponseProperty =
    (uploader.options.retry && uploader.options.retry.preventRetryResponseProperty)
    || 'preventRetry'

  return !!response[preventRetryResponseProperty]
}


class FileRetryButton extends Component {
  static propTypes = {
    children: PropTypes.node,
    id: PropTypes.number.isRequired,
    onlyRenderIfRetryable: PropTypes.bool,
    uploader: PropTypes.object.isRequired,
  };

  static defaultProps = {
    onlyRenderIfRetryable: true,
  };

  constructor(props) {
    super(props)

    this.state = { retryable: false }

    this.onComplete = (id, name, response) => {
      if (id === this.props.id && !this.unmounted) {
        const retryForbidden = isRetryForbidden(response, this.props.uploader)

        if (!response.success && !retryForbidden && !this.state.retryable) {
          this.setState({ retryable: true })
        } else if (response.success && this.state.retryable) {
          this.setState({ retryable: false })
        } else if (retryForbidden && this.state.retryable) {
          this.setState({ retryable: false })
          this.unregisterEventHandlers()
        }
      }
    }

    this.onStatusChange = (id, oldStatus, newStatus) => {
      if (
        id === this.props.id
        && !this.unmounted
        && newStatus === props.uploader.qq.status.UPLOAD_RETRYING
      ) {
        this.setState({ retryable: false })
      }
    }

    this.onClick = () => this.props.uploader.methods.retry(this.props.id)
  }

  componentDidMount() {
    this.props.uploader.on('complete', this.onComplete)
    this.props.uploader.on('statusChange', this.onStatusChange)
  }

  componentWillUnmount() {
    this.unmounted = true
    this.unregisterEventHandlers()
  }

  unregisterEventHandlers() {
    this.props.uploader.off('complete', this.onComplete)
    this.props.uploader.off('statusChange', this.onStatusChange)
  }

  render() {
    const { children, onlyRenderIfRetryable, id, uploader, ...elementProps } = this.props
    const content = children || 'Retry'

    if (this.state.retryable || !onlyRenderIfRetryable) {
      return (
        <button
          aria-label="retry"
          className={`${this.props.className || ''}`}
          disabled={!this.state.retryable}
          onClick={this.state.retryable ? this.onClick : undefined}
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


export default FileRetryButton
