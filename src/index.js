/**
 * @class ExampleComponent
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import uploaderActions from './actions'
import uploaderReducers from './reducers'


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

export { uploaderActions, uploaderReducers }
