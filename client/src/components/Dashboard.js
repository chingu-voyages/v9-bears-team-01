import React, { Component } from 'react';
import Table from './Table';
import { Container, Row, Button } from 'react-bootstrap';
import AddBuyForm from './AddBuyForm';

export default class Dashboard extends Component {
  constructor(...args) {
		super(...args);

		this.state = { modalShow: false };
  }
  
  render() {
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <Container className="mt-3">
        <Row>
          <Button
          variant="primary"
          onClick={() => this.setState({ modalShow: true })}
          >
            Add Transaction
          </Button>
        </Row>

        <AddBuyForm
        show={this.state.modalShow}
        onHide={modalClose}
        />

        <br/>
        <Row>
          <Table />
        </Row>
      </Container>
    );
  }
}
