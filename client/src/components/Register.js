import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap/';
import { AppContextConsumer } from '../contexts/AppContext';

export default class Register extends Component {
  state = {
    error: false,
    errorMessage: '',
    validated: false
  };

  handleSubmit = async event => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    this.setState({ validated: true });

    console.log(form.elements);

    const user = {
      firstName: form.elements.firstName.value,
      lastName: form.elements.lastName.value,
      email: form.elements.email.value,
      password: form.elements.password.value
    };
    try {
      console.log('trying to post:', user);
      const response = await axios.post('/api/users', user);
      console.log('here is my response:', response);
      localStorage.setItem('token', response.data.token);

      //Redirect user to /dashboard...
      this.props.history.push('/dashboard');
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
                <Alert
                  variant='danger'
                  show={this.state.error}
                  onClose={handleDismiss}
                  dismissible
                >
                  <p className='ma-0'>{this.state.errorMessage}</p>
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
                    <Form.Control type='text' name='firstName' required />
                    <Form.Control.Feedback type='invalid'>
                      Please enter first name.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control type='text' name='lastName' required />
                    <Form.Control.Feedback type='invalid'>
                      Please enter a last name.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type='email' required name='email' />
                    <Form.Control.Feedback type='invalid'>
                      Please enter an email.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type='password'
                      pattern='.{6,}'
                      required
                      name='password'
                    />
                    <Form.Control.Feedback type='invalid'>
                      Please enter a password more than 6 characters.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button variant='primary' type='submit'>
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
