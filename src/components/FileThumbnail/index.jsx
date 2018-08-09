import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Placeholder from './Placeholder'

import NotAvailablePlaceholder from './NotAvailablePlaceholder'
import WaitingPlaceholder from './WaitingPlaceholder'

export const defaultMaxSize = 120
export const notAvailableStatus = 'not-available'
export const waitingStatus = 'waiting'

class FileThumbnail extends Component {
  static propTypes = {
    customResizer: PropTypes.func,
    fromServer: PropTypes.bool,
    id: PropTypes.number.isRequired,
    maxSize: PropTypes.number,
    notAvailablePlaceholder: PropTypes.element,
    uploader: PropTypes.object.isRequired,
    waitingPlaceholder: PropTypes.element,
  };

  static defaultProps = {
    maxSize: defaultMaxSize,
  };

  constructor() {
    super()
    this.state = {
      drawComplete: false,
    }
  }

  componentDidMount() {
    this.props.uploader.methods.drawThumbnail(
      this.props.id,
      this.canvas,
      this.props.maxSize,
      this.props.fromServer,
      this.props.customResizer,
    )
      .then(
        () => {
          this.setState({
            drawComplete: true,
            success: true,
          })
        },
        () => {
          this.setState({
            drawComplete: true,
            success: false,
          })
        },
      )
  }

  get failure() {
    return this.state.drawComplete && !this.state.success
  }

  get maybePlaceholder() {
    if (this.failure) {
      const notAvailableImage = (
        <NotAvailablePlaceholder maxSize={this.props.maxSize} />
      )
      return (
        <Placeholder
          className={`${this.props.className || ''}`}
          image={this.props.notAvailablePlaceholder || notAvailableImage}
          size={this.props.maxSize}
          status={notAvailableStatus}
        />
      )
    } else if (!this.state.drawComplete) {
      const waitingImage = (
        <WaitingPlaceholder maxSize={this.props.maxSize} />
      )
      return (
        <Placeholder
          className={`${this.props.className || ''}`}
          image={this.props.waitingPlaceholder || waitingImage}
          size={this.props.maxSize}
          status={waitingStatus}
        />
      )
    }
    return <span />
  }

  render() {
    return (
      <span >
        <canvas
          className={`${this.props.className || ''}`}
          hidden={!this.state.drawComplete || this.failure}
          ref={component => this.canvas = component}
        />

        { this.maybePlaceholder }
      </span>
    )
  }
}

export default FileThumbnail
