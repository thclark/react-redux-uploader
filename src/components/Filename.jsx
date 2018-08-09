import React, { Component } from 'react'
import PropTypes from 'prop-types'


class Filename extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    uploader: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      filename: props.uploader.methods.getName(props.id),
    }
    this.interceptSetName()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.filename !== this.state.filename
  }

  interceptSetName() {
    const oldSetName = this.props.uploader.methods.setName
    this.props.uploader.methods.setName = (id, newName) => {
      oldSetName.call(this.props.uploader.methods, id, newName)
      if (id === this.props.id) {
        this.setState({
          filename: newName,
        })
      }
    }
  }

  render() {
    return (
      <span className={`${this.props.className || ''}`}>
        { this.state.filename }
      </span>
    )
  }
}

export default Filename
