import objectAssign from 'object-assign'
import React, { Component } from 'react'
import PropTypes from 'prop-types'


const getStatusToDisplay = ({ displayMap, status }) => {
  let key

  if (status.indexOf(' ') > 0) {
    const statusParts = status.split(' ')

    key = `${statusParts[0]}_${statusParts[1]}`
  }
  else {
    key = status
  }

  return displayMap[key]
}


class FileStatus extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    className: PropTypes.string,
    text: PropTypes.shape({
      canceled: PropTypes.string,
      deleted: PropTypes.string,
      deleting: PropTypes.string,
      paused: PropTypes.string,
      queued: PropTypes.string,
      retrying_upload: PropTypes.string,
      submitting: PropTypes.string,
      uploading: PropTypes.string,
      upload_failed: PropTypes.string,
      upload_successful: PropTypes.string,
    }),
    uploader: PropTypes.object.isRequired,
  };

  static defaultProps = {
    className: '',
    text: {
      canceled: 'Canceled',
      deleted: 'Deleted',
      deleting: 'Deleting...',
      paused: 'Paused',
      queued: 'Queued',
      retrying_upload: 'Retrying...',
      submitting: 'Submitting...',
      uploading: 'Uploading...',
      upload_failed: 'Failed',
      upload_successful: 'Completed',
    },
  }

  constructor(props) {
    super(props)

    this.state = {
      status: '',
      text: objectAssign({}, FileStatus.defaultProps.text, props.text || {}),
    }

    this.onStatusChange = (id, oldStatus, newStatus) => {
      if (id === this.props.id && !this.unmounted) {
        const newStatusToDisplay = getStatusToDisplay({
          displayMap: this.state.text,
          status: newStatus,
        })
        if (newStatusToDisplay) {
          this.setState({ status: newStatusToDisplay })
        }
      }
    }
  }

  componentDidMount() {
    this.props.uploader.on('statusChange', this.onStatusChange)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text) {
      this.setState({
        text: objectAssign({}, this.state.text, nextProps.text),
      })
    }
  }

  componentWillUnmount() {
    this.unmounted = true
    this.unregisterStatusChangeHandler()
  }

  unregisterStatusChangeHandler() {
    this.props.uploader.off('statusChange', this.onStatusChange)
  }

  render() {
    return (
      <span className={`${this.props.className}`}>
        { this.state.status }
      </span>
    )
  }
}


export default FileStatus
