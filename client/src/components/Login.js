import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div>
        <form action='/action_page.php'>
          <label>Email: </label>
          <input type='text' name='email' />
          <label>Password: </label>
          <input type='text' name='password' />
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}
