import React, { Component } from 'react';
const axios = require('axios');

export default class Register extends Component {
  state = {
    firstName: 'TestFirst',
    lastName: 'TestLast',
    email: '',
    password: '',
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
      const response = await axios.post('/api/users', this.state);
      console.log(response);
      localStorage.setItem('token', response.data.token);

      //need to redirect user to /dashboard...
    } catch (error) {
      this.setState({ error: true, errorMessage: 'Unable to log in.' });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>First Name: </label>
          <input
            name='firstName'
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <label>Last Name: </label>
          <input
            name='lastName'
            value={this.state.lastName}
            onChange={this.handleChange}
          />
          <label>Email: </label>
          <input
            name='email'
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label>Password: </label>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />
          {this.state.error === true && <p>{this.state.errorMessage}</p>}
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}
