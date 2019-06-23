import React, { Component } from 'react';
import Table from './Table';
import { Container, Row, Button } from 'react-bootstrap';

import axios from 'axios';

import AddBuyForm from './AddBuyForm';
import StockContext from '../contexts/StockContext';
export default class Dashboard extends Component {
  static contextType = StockContext;

  constructor(...args) {
    super(...args);

    this.state = { modalShow: false, stocks: [] };
  }

  async componentDidMount() {
    console.log('dashboard context: ', this.context);
    // const token = localStorage.token;
    // try {
    //   if (token) {
    //     const stocks = await axios.get('/api/stocks', {
    //       headers: { Authorization: `Bearer ${token}` }
    //     });
    //     await this.setState({ stocks });
    //     console.log('dashboard state', this.state);
    //   }
    // } catch (e) {}
    // console.log('context in')
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <Container className='mt-3'>
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
