import React, { Component } from 'react' 
//import { Model } from 'mongoose';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

class AddBuyForm extends Component {
	constructor(...args) {
		super(...args);

		this.state = { validated: false };
	}

	handleSubmit(event) {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.setState({ validated: true });
	}

  render() {
		const { validated } = this.state;

		return (
			<Modal
			 {...this.props}
			 centered
			 >
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Add Buy Transaction
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form
					 noValidate
					 validated={validated}
					 onSubmit={e => this.handleSubmit(e)}
					>
						<Form.Group controlId="formTicker">
							<Form.Label>Ticker</Form.Label>
							<Form.Control 
							 type="text" 
							 placeholder="Enter Ticker"
							 required 
							/>
							<Form.Control.Feedback type='invalid'>Please enter a Ticker.</Form.Control.Feedback>
						</Form.Group>
						
						<Form.Group controlId="formDate">
							<Form.Label>Date</Form.Label>
							<Form.Control required type="date" />
							<Form.Control.Feedback type='invalid'>Please select a date.</Form.Control.Feedback>
						</Form.Group>
						
						<Form.Group controlId="formQuantity">
							<Form.Label>Quantity</Form.Label>
							<Form.Control required type="number" min='0' />
							<Form.Control.Feedback type='invalid'>Please enter a quantity.</Form.Control.Feedback>
						</Form.Group>
						
						<Form.Group controlId="formPricePerShare">
							<Form.Label>Price Per Share</Form.Label>
							<Form.Control required type="text" />
							<Form.Control.Feedback type='invalid'>Please enter a price per share.</Form.Control.Feedback>
						</Form.Group>
						
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		)
	}
}

export default AddBuyForm
