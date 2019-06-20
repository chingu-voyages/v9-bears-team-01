import React, { Component } from 'react' 
//import { Model } from 'mongoose';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

class AddBuyForm extends Component {
	// constructor(...args) {
	// 	super(...args);

	// 	this.state = { validated: false };
	// }

	// handleSubmit(event) {
	// 	const form = event.currentTarget;
	// 	if (form) {

	// 	}
	// 	this.setState({ validated: true });
	/// }

  render() {
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
					<Form>
						<Form.Group controlId="formTicker">
							<Form.Label>Ticker</Form.Label>
							<Form.Control type="text" placeholder="Enter Ticker" />
						</Form.Group>
						
						<Form.Group controlId="formDate">
							<Form.Label>Date</Form.Label>
							<Form.Control type="date" />
						</Form.Group>
						
						<Form.Group controlId="formQuantity">
							<Form.Label>Quantity</Form.Label>
							<Form.Control type="number" />
						</Form.Group>
						
						<Form.Group controlId="formPricePerShare">
							<Form.Label>Price Per Share</Form.Label>
							<Form.Control type="text" />
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
