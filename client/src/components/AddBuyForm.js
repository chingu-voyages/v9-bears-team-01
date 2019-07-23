import React, { Component } from 'react';
//import { Model } from 'mongoose';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { AppContextConsumer } from '../contexts/AppContext';
class AddBuyForm extends Component {
  constructor(...args) {
    super(...args);

    this.state = { validated: false };
  }

  handleSubmit = async event => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    this.setState({ validated: true });

    const stockBuy = {
      ticker: form.elements.ticker.value,
      quantity: form.elements.quantity.value,
      price: form.elements.price.value,
      date: form.elements.date.value
    };
    try {
      console.log('trying to post');
      const token = localStorage.token;
      const response = await axios.post('/api/stocks', stockBuy, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('here is my response:', response);
      console.log('here are my props:', this.props);
      this.props.hide();
      this.props.getStocks();
      //Redirect user to /dashboard...
      // this.props.history.push('/dashboard');
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: 'Unable to add transaction.'
      });
    }
  };

  render() {
    const { validated } = this.state;

    return (
      <Modal {...this.props} centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Add Buy Transaction
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={e => this.handleSubmit(e)}
          >
            <Form.Group controlId='formTicker'>
              <Form.Label>Ticker</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Ticker'
                required
                name='ticker'
              />
              <Form.Control.Feedback type='invalid'>
                Please enter a Ticker.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='formDate'>
              <Form.Label>Date</Form.Label>
              <Form.Control required type='date' name='date' />
              <Form.Control.Feedback type='invalid'>
                Please select a date.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='formQuantity'>
              <Form.Label>Quantity</Form.Label>
              <Form.Control required type='number' min='0' name='quantity' />
              <Form.Control.Feedback type='invalid'>
                Please enter a quantity.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='formPricePerShare'>
              <Form.Label>Price Per Share</Form.Label>
              <Form.Control required type='number' name='price' />
              <Form.Control.Feedback type='invalid'>
                Please enter a price per share.
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <AppContextConsumer>
    {function({ getStocks }) {
      return <AddBuyForm {...props} getStocks={getStocks} ref={ref} />;
    }}
  </AppContextConsumer>
));
