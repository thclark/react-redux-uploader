import React, { Component } from 'react'
import { Card, CardGroup, Col, Container, Row } from 'reactstrap'

import ExampleUploader from './components'


export default class App extends Component {
  render () {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row>
            <Col xs="12">
              <CardGroup style={{ marginTop: '2rem', marginBottom: '1rem' }}>
                <Card className="p-4">

                  <ExampleUploader uploader={this.props.uploader} />

                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
