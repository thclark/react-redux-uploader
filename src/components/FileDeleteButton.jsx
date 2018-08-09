import React, { Component } from 'react'
import PropTypes from 'prop-types'


const isDeletable = (statusToCheck, statusEnum) => {
  return [
    statusEnum.DELETE_FAILED,
    statusEnum.UPLOAD_SUCCESSFUL,
  ].indexOf(statusToCheck) >= 0
}


class FileDeleteButton extends Component {
  static propTypes = {
    children: PropTypes.node,
    id: PropTypes.number.isRequired,
    onlyRenderIfDeletable: PropTypes.bool,
    uploader: PropTypes.object.isRequired,
  };

  static defaultProps = {
    onlyRenderIfDeletable: true,
  };

  constructor(props) {
    super(props)

    this.state = {
      deletable: false,
      deleting: false,
    }

    const statusEnum = props.uploader.qq.status

    this.onStatusChange = (id, oldStatus, newStatus) => {
      if (id === this.props.id && !this.unmounted) {
        if (!isDeletable(newStatus, statusEnum) && newStatus !== statusEnum.DELETING && this.state.deletable) {
          !this.unmounted && this.setState({
            deletable: false,
            deleting: false,
          })
          this.unregisterStatusChangeHandler()
        } else if (isDeletable(newStatus, statusEnum) && !this.state.deletable) {
          this.setState({
            deletable: true,
            deleting: false,
          })
        } else if (newStatus === statusEnum.DELETING && !this.state.deleting) {
          this.setState({ deleting: true })
        }
      }
    }

    this.onClick = () => this.props.uploader.methods.deleteFile(this.props.id)
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
    const { children, onlyRenderIfDeletable, id, uploader, ...elementProps } = this.props // eslint-disable-line no-unused-vars
    const content = children || 'Delete'

    if (this.state.deletable || this.state.deleting || !onlyRenderIfDeletable) {
      return (
        <button
          aria-label="delete"
          className={`${this.props.className || ''}`}
          disabled={!this.state.deletable || this.state.deleting}
          onClick={(this.state.deletable && !this.state.deleting) ? this.onClick : null}
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

export default FileDeleteButton
