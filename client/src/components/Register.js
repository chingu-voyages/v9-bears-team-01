import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
const axios = require('axios');

export default class Register extends Component {
	
  state = {
    firstName: 'TestFirst',
    lastName: 'TestLast',
    email: '',
    password: '',
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
		} else {
			this.setState({validated: true});

			// try {
			// 	const response = await axios.post('/api/users', this.state);
			// 	console.log(response);
			// 	localStorage.setItem('token', response.data.token);

			// 	//need to redirect user to /dashboard...
			// } catch (error) {
			// 	this.setState({ error: true, errorMessage: 'Unable to log in.' });
			// }
		}
  };

  render() {
		const { validated } = this.state.validated;

    return (
			<Form
			 noValidate
			 validated={validated} 
			 onSubmit={e => this.handleSubmit(e)}
			>
				<Form.Group>
					<Form.Label>First Name:</Form.Label>
					<Form.Control
					 type='text'
					 placeholder='John'
					 //value={this.state.firstName}
					 onChange={this.handleChange}
					 required
					 />
					<Form.Control.Feedback type='invalid'>Please enter first name.</Form.Control.Feedback>
				</Form.Group>
				
				<Form.Group>
					<Form.Label>Last Name:</Form.Label>
					<Form.Control
					 type='text'
					 placeholder='Doe'
					 value={this.state.lastName}
					 onChange={this.handleChange}
					 required
					/>
					<Form.Control.Feedback type='invalid'>Please enter last name.</Form.Control.Feedback>
				</Form.Group>
				
				<Form.Group>
					<Form.Label>Email:</Form.Label>
					<Form.Control
					 type='text'
					 value={this.state.email}
					 onChange={this.handleChange}
					/>
					<Form.Control.Feedback type='invalid'>Please enter valid email.</Form.Control.Feedback>
				</Form.Group>

				<Form.Group>
					<Form.Label>Password:</Form.Label>
					<Form.Control
					 type='password'
					 name='password'
					 value={this.state.password}
					 onChange={this.handleChange}
					/>
					<Form.Control.Feedback type='invalid'>Please enter password.</Form.Control.Feedback>
				</Form.Group>
				{this.state.error === true && <p>{this.state.errorMessage}</p>}
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
    );
  }
}
