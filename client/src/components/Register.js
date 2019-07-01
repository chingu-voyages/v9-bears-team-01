import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap/';
import { AppContextConsumer } from '../contexts/AppContext';


export default class Register extends Component {
  state = {
    firstName: 'TestFirst',
    lastName: 'TestLast',
    email: 'test@mail.com',
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
		this.setState({validated: true});
		event.preventDefault();
		
		try {
			const response = await axios.post('/api/users', this.state);
			console.log(response);
			localStorage.setItem('token', response.data.token);

			//need to redirect user to /dashboard...
		} catch (error) {
			this.setState({ error: true, errorMessage: 'Unable to register.' });
		}
  };

  render() {
		//Used to handle form validation
		const { validated } = this.state;

		//Used to handle error message
		const handleDismiss = () => this.setState({ error: false });

    return (
      <AppContextConsumer>
        {({ user, register }) => {
          if (user) {
            return <Redirect to='/profile' />;
          } else {
            return (
              <div>
								<Alert variant="danger" show={this.state.error} onClose={handleDismiss} dismissible>
									<p className="ma-0">{this.state.errorMessage}</p>
								</Alert>

                <Form
								 noValidate
								 validated={validated}
                 onSubmit={e => {
									console.log('event:', e);
									this.handleSubmit(e);
									//register(this.state);
                 }}
                >
									<Form.Group>
										<Form.Label>First Name:</Form.Label>
										<Form.Control
										 type="text"
										 placeholder="John"
										 value={this.state.firstName}
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
										<Form.Control.Feedback type='invalid'>Please enter a last name.</Form.Control.Feedback>
									</Form.Group>
                  
									<Form.Group>
										<Form.Label>Email:</Form.Label>
										<Form.Control
										 type='email'
										 value={this.state.email}
										 onChange={this.handleChange}
										 required
										/>
										<Form.Control.Feedback type='invalid'>Please enter an email.</Form.Control.Feedback>
									</Form.Group>
                  
									<Form.Group>
										<Form.Label>Password:</Form.Label>
										<Form.Control
										 type='password'
										 value={this.state.password}
										 onChange={this.handleChange}
										 pattern='.{6,}'
										 required
										/>
										<Form.Control.Feedback type='invalid'>Please enter a password more than 6 characters.</Form.Control.Feedback>
									</Form.Group>
									<Button variant="primary" type="submit">
										Submit
									</Button>
                </Form>
              </div>
            );
          }
        }}
      </AppContextConsumer>
    );
  }
}
