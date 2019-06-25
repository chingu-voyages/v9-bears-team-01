import React, { Component } from 'react';
import { AppContextConsumer } from '../contexts/AppContext';
import { Redirect } from 'react-router-dom';

export default class Profile extends Component {
  render() {
    return (
      <div>
        <AppContextConsumer>
          {({ user }) => {
            if (user) {
              return <p>profile page</p>;
            } else {
              return <Redirect to='/' />;
            }
          }}
        </AppContextConsumer>
      </div>
    );
  }
}
