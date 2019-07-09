import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';


const axios = require('axios');

export default class Login extends Component {
  state = {
    email: 'millifly1@gmail.com',
    password: '123456',
    error: false,
		errorMessage: '',
		validated: false
  };

  handleChange = async event => {
    await this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
		const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
		}
		event.preventDefault();

    try {
      const response = await axios.post('/api/users/login', this.state);
			console.log(response);
			console.log("Setting token")
      localStorage.setItem('token', response.data.token);

      //redirect
    } catch (error) {
			event.stopPropagation();
      this.setState({ error: true, errorMessage: 'Unable to log in.' });
		}
		console.log('test');
		this.setState({ validated: true });
  };

  render() {
		//Used to validate form
		const { validated } = this.state;

		//Used to dismiss/show error message
		const handleDismiss = () => this.setState({ error: false });

    return (
      <Container>
				<Row className="mt-5 align-items-xs-center justify-content-md-center">
					<Col md="6">
						<Alert variant="danger" show={this.state.error} onClose={handleDismiss} dismissible>
							<p className="ma-0">{this.state.errorMessage}</p>
						</Alert>
				
						<Form 
						 noValidate
						 validated={validated}
						 onSubmit={e => this.handleSubmit(e)}
						>
							<Form.Group>
								<Form.Label>Email:</Form.Label>
								<Form.Control
								type='text'
								name='firstName' 
								placeholder='Email' 
								value={this.state.email}
								onChange={this.handleChange}
								required
								/>
								<Form.Control.Feedback type='invalid'>Please enter email.</Form.Control.Feedback>
							</Form.Group>

							<Form.Group>
								<Form.Label>Password:</Form.Label>
								<Form.Control
								type='password'
								name='password'
								value={this.state.password}
								onChange={this.handleChange}
								/>
							</Form.Group>

							<Button variant="primary" type="submit">
								Submit
							</Button>
        		</Form>
					</Col>
				</Row>
      </Container>
    );
  }
}
