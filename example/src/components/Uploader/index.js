import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FileInput from 'react-fine-uploader/file-input'
import Thumbnail from 'react-fine-uploader/thumbnail'
import CancelButton from 'react-fine-uploader/cancel-button'
import DeleteButton from 'react-fine-uploader/delete-button'
import Dropzone from 'react-fine-uploader/dropzone'
import Filename from 'react-fine-uploader/filename'
import Filesize from 'react-fine-uploader/filesize'
import PauseResumeButton from 'react-fine-uploader/pause-resume-button'
import ProgressBar from 'react-fine-uploader/progress-bar'
import RetryButton from 'react-fine-uploader/retry-button'
import Status from 'react-fine-uploader/status'
import PauseIcon from 'react-fine-uploader/gallery/pause-icon'
import PlayIcon from 'react-fine-uploader/gallery/play-icon'
import XIcon from 'react-fine-uploader/gallery/x-icon'

// This is where we add styling - in our own application, not in the uploader library. In this case, we just use Reactstrap for a bootstrap-styled component
import { Col, Row, Card, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import ReactTable from 'react-table'


const stringFilter = ({ filter, onChange }) => (
  <InputGroup>
    <InputGroupAddon addonType="prepend">
      Filter
    </InputGroupAddon>
    <Input
      placeholder=""
      onChange={event => onChange(event.target.value)}
      value={filter ? filter.value : ''}
    />
  </InputGroup>
)

const stringFilterMethod = (filter, row) => {
  console.log('Filtering string', filter, row)
  return row[filter.id].includes(filter.value)
}


const isFileGone = (statusToCheck, statusEnum) => {
  console.log('Checking file presence', statusToCheck, statusEnum)
  return [
    statusEnum.CANCELED,
    statusEnum.DELETED,
  ].indexOf(statusToCheck) >= 0
}


class FileProgressBar extends Component {
  render() {
    const { row, uploader, ...rest } = { ...this.props }
    console.log('Rendering row fileProgress with props', this.props)
    return (
      <ProgressBar
        // className="react-fine-uploader-gallery-progress-bar"
        id={row.id}
        uploader={uploader}
        {...rest}
      />
      // <span>
      //   <span
      //     style={{
      //       color: row.value === 'relationship' ? '#ff2e00'
      //         : row.value === 'complicated' ? '#ffbf00'
      //           : '#57d500',
      //       transition: 'all .3s ease',
      //     }}
      //   >
      //   &#x25cf;
      //   </span> {
      //     row.value === 'relationship' ? 'In a relationship'
      //       : row.value === 'complicated' ? `It's complicated`
      //       : 'Single'
      //   }
      // </span>
    )
  }
}


class FileDeleteButton extends Component {
  render() {
    const { row, uploader, ...rest } = { ...this.props }
    return (
      <DeleteButton
        // className="react-fine-uploader-gallery-delete-button"
        id={row.id}
        uploader={uploader}
        {...rest}
      >
        <i className="fa fa-trash" />
      </DeleteButton>
    )
  }
}


class FileThumbnail extends Component {
  render() {
    const { row, uploader, ...rest } = { ...this.props }
    console.log('rendering thumbnail', row, uploader, rest)
    return (
      <Thumbnail
        // className="react-fine-uploader-gallery-thumbnail"
        fromServer={row.fromServer}
        id={row.id}
        uploader={uploader}
        {...rest}
      />
    )
  }
}


class FileSize extends Component {
  render() {
    const { row, uploader, ...rest } = { ...this.props }
    return (
      <Filesize
        // className="react-fine-uploader-gallery-filesize"
        id={row.id}
        uploader={uploader}
        {...rest}
      />
    )
  }
}


class FileName extends Component {
  render() {
    const { row, uploader, ...rest } = { ...this.props }
    return (
      <Filename
        // className="react-fine-uploader-gallery-filesize"
        id={row.id}
        uploader={uploader}
        {...rest}
      />
    )
  }
}


class FileStatus extends Component {
  render() {
    const { row, uploader, ...rest } = { ...this.props }
    return (
      <Status
        // className="react-fine-uploader-gallery-status"
        id={row.id}
        uploader={uploader}
        {...rest}
      />
    )
  }
}


class Uploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleFiles: [],
    }

    const statusEnum = props.uploader.qq.status

    this.onStatusChange = (id, oldStatus, status) => {
      let visibleFiles = [...this.state.visibleFiles]

      if (status === statusEnum.SUBMITTED) {
        visibleFiles.push({ id })
        this.setState({ visibleFiles })
      } else if (isFileGone(status, statusEnum)) {
        this.removeVisibleFile(id)
      } else if (status === statusEnum.UPLOAD_SUCCESSFUL|| status === statusEnum.UPLOAD_FAILED) {
        if (status === statusEnum.UPLOAD_SUCCESSFUL) {
          const visibleFileIndex = this.findFileIndex(id)
          if (visibleFileIndex < 0) {
            visibleFiles.push({ id, fromServer: true })
          }
        }
        this.updateVisibleFileStatus(id, status)
      }
    }
  }

  componentDidMount() {
    this.props.uploader.on('statusChange', this.onStatusChange)
  }

  componentWillUnmount() {
    this.props.uploader.off('statusChange', this.onStatusChange)
  }

  addFileToState(file) {
    let newData = [...this.state.visibleFiles]
    newData.splice(0, 1)
    console.log('Adding file to state', file)
    newData.push(file)
    this.setState({
      ...this.state,
      visibleFiles: newData,
    })
  }

  removeVisibleFile(id) {
    const visibleFileIndex = this.findFileIndex(id)
    if (visibleFileIndex >= 0) {
      const visibleFiles = [...this.state.visibleFiles]
      visibleFiles.splice(visibleFileIndex, 1)
      this.setState({ visibleFiles })
    }
  }

  updateVisibleFileStatus(id, status) {
    let newData = [...this.state.visibleFiles]
    let updated = false
    newData.some((file) => {
      if (file.id === id) {
        file.status = status
        updated = true
        return true
      }
      return false
    })
    if (updated) {
      this.setState({ visibleFiles: newData })
    }
  }

  findFileIndex(id) {
    let visibleFileIndex = -1
    this.state.visibleFiles.some((file, index) => {
      if (file.id === id) {
        visibleFileIndex = index
        return true
      }
      return false
    })
    return visibleFileIndex
  }

  render() {
    const uploader = this.props.uploader
    const chunkingEnabled = uploader.options.chunking && uploader.options.chunking.enabled
    const deleteEnabled = uploader.options.deleteFile && uploader.options.deleteFile.enabled
    const cancelButtonProps = { children: <XIcon /> }
    const dropzoneProps = {
      disabled: false,
      dropActiveClassName: '',
      multiple: true,
    }
    const fileInputProps = { multiple: true }
    const pauseResumeButtonProps = chunkingEnabled && {
      pauseChildren: <PauseIcon />,
      resumeChildren: <PlayIcon />,
    }
    const retryButtonProps = { children: <PlayIcon /> }
    const thumbnailProps = { maxSize: 30 }

    const columns = [
      {
        Header: '',
        accessor: 'id',  // bodge to ensure id field is in the row
        filterable: false,
        Cell: cell => (<FileThumbnail row={cell.row} uploader={uploader} {...thumbnailProps} />),
        // maxWidth: 35,
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: cell => (<FileName row={cell.row} uploader={uploader} />),
        filterMethod: stringFilterMethod,
        Filter: stringFilter,
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: cell => (<FileStatus row={cell.row} uploader={uploader} />),
        sortMethod: null,
        filterMethod: (filter, row) => {
          const rowStatus = row.status ? row.status : 'queued'
          switch (filter.value) {
            case 'pending':
              return (
                (rowStatus === 'queued') || (rowStatus === 'canceled') || (rowStatus === 'paused') || (rowStatus === 'deleting')
              )
            case 'uploading':
              return (
                (rowStatus === 'retrying') || (rowStatus === 'submitting') || (rowStatus === 'uploading')
              )
            case 'complete':
              return (
                (rowStatus === 'upload successful')
              )
            case 'failed':
              return (
                (rowStatus === 'upload failed')
              )
            default:
              // The remaining (and default) option is to show all
              return true
          }
        },
        Filter: ({ filter, onChange }) => (
          <Input
            type="select"
            onChange={event => onChange(event.target.value)}
            value={filter ? filter.value : 'all'}
          >
            <option value="all">Show All</option>
            <option value="pending">Pending</option>
            <option value="uploading">Uploading</option>
            <option value="complete">Complete</option>
            <option value="failed">Failed</option>
          </Input>
        ),
      },
      {
        Header: 'Size',
        accessor: 'size',
        filterable: false,
        Cell: cell => (<FileSize row={cell.row} uploader={uploader} />),
      },
      // {
      //   Header: 'Progress',
      //   accessor: 'progress',
      //   filterable: false,
      //   Cell: cell => (<FileProgressBar row={cell.row} uploader={uploader} />),
      // },
      {
        Header: 'Delete',
        accessor: 'id',
        filterable: false,
        Cell: cell => (<FileDeleteButton row={cell.row} uploader={uploader} />),
        maxWidth: 50,
      },
    ]

    console.log('re-rendering with visibleFiles', this.state.visibleFiles)
    return (
      <Row>
        <Col md={{ size: 3 }}>
          <Row>
            <Col>
              <Dropzone className="dropzone dropzone-panel-item" uploader={uploader} {...dropzoneProps} >
                <Row className="h-100">
                  <Col className="dropzone-content text-center">
                    <i className="fa fa-upload fa-lg" />
                    <p>Drop files/folders here </p>
                  </Col>
                </Row>
              </Dropzone>
            </Col>
          </Row>
          <Row>
            <Col>
              <FileInput className="btn btn-danger dropzone-panel-item" uploader={uploader} {...fileInputProps} >
                <span>
                  <i className="fa fa-upload" /> Select Files
                </span>
              </FileInput>
            </Col>
          </Row>
        </Col>
        <Col md={{ size: 9 }}>
          <Card className="file-table-panel">
            <ReactTable
              data={this.state.visibleFiles}
              columns={columns}
              minRows={5}
              defaultPageSize={10}
              filterable
              className="-highlight"
            />
          </Card>

                  {/*<PauseResumeButton className='react-fine-uploader-gallery-pause-resume-button'*/}
                                     {/*id={ id }*/}
                                     {/*uploader={ uploader }*/}
                                     {/*{ ...pauseResumeButtonProps }*/}

          <ProgressBar className="react-fine-uploader-gallery-total-progress-bar" uploader={uploader} />
        </Col>

      </Row>
    )
  }
}


Uploader.propTypes = {
  uploader: PropTypes.object.isRequired,
}


export default Uploader