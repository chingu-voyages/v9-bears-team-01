import React, { Component } from 'react';
import Table from './Table';
import { Container, Row, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import AddBuyForm from './AddBuyForm';

export default class Dashboard extends Component {
  // static contextType = StockContext;

  constructor(...args) {
    super(...args);

    this.state = { modalShow: false, stocks: [] };
	}
	
	//Check if user is login
	userLogin() {
		if (!localStorage.token) {
			return <Redirect to={{pathname: '/login', state: this.props.location}} />
		}
	}

  render() {
		let modalClose = () => this.setState({ modalShow: false });

    return (
      <Container className='mt-3'>
				{this.userLogin()}
        <Row>
          <Button
            variant='primary'
            onClick={() => this.setState({ modalShow: true })}
          >
            Add Transaction
          </Button>
        </Row>
        <AddBuyForm show={this.state.modalShow} onHide={modalClose} />
        <br />
        <Row>
          <Table />
        </Row>
      </Container>
    );
  }
}
