import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { Container, Row, Col } from 'react-bootstrap';


const axios = require('axios');

export default class Login extends Component {
  state = {
    email: 'millifly1@gmail.com',
    password: '123456',
    error: false,
    errorMessage: ''
  };

  handleChange = async event => {
    await this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/users/login', this.state);
      console.log(response);
      localStorage.setItem('token', response.data.token);

      //need to redirect user to /dashboard...
    } catch (error) {
      this.setState({ error: true, errorMessage: 'Unable to log in.' });
    }
  };

  render() {
    return (
      <Container>
				<Row className="mt-5 align-items-xs-center justify-content-md-center">
					<Col md="6">
						<Form onSubmit={this.handleSubmit}>

							<Form.Group>
								<Form.Label>Email:</Form.Label>
								<Form.Control
								type='text'
								name='firstName' 
								placeholder='Email' 
								value={this.state.email}
								onChange={this.handleChange}
								/>
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

							{this.state.error === true && <p>{this.state.errorMessage}</p>}
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
