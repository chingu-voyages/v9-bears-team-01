import React, { Component } from 'react';
import axios from 'axios';
const AppContext = React.createContext();

class AppContextProvider extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      stocks: [],
      user: null,
      logout: this.logout,
      register: this.register
    };
  }

  logout = async () => {
    const token = localStorage.token;
    try {
      if (token) {
        const response = await axios.post(
          '/api/users/logout',
          {},
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        console.log('user logged out:', response.data);
        localStorage.removeItem('token');

        await this.setState({ user: null });

        console.log('app state: ', this.state);
      }
    } catch (e) {
      console.log('Error: could not log user out.', e);
    }
  };

  getStocks = async () => {
    console.log('in getStocks, state:', this.state);
    const token = localStorage.token;
    try {
      if (this.state.user !== null) {
        const response = await axios.get('/api/stocks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // console.log('response data:', response.data);
        await this.setState({ stocks: response.data });
        // console.log('app state: ', this.state);
      }
    } catch (e) {
      console.log('app componenet did mount error:', e);
    }
  };

  register = async body => {
    console.log('/register called, body: ', body);
    try {
      const response = await axios.post('/api/users', body);
      console.log('user created', response.data);

      await this.setState({ user: response.data });

      console.log('app state: ', this.state);
    } catch (e) {
      console.log('Error: could not register user.', e);
    }
  };

  async checkUser() {
    const token = localStorage.token;
    try {
      if (token) {
        const response = await axios.get('/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('check user response data:', response.data);
        await this.setState({ user: response.data });
        console.log('app state: ', this.state);
      }
    } catch (e) {
      console.log('app componenet did mount error:', e);
    }
  }

  async componentDidMount() {
    await this.checkUser();
    await this.getStocks();
    // console.log('app state component did mount: ', this.state);
  }

  render() {
    return (
      <AppContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
const AppContextConsumer = AppContext.Consumer;
export { AppContextProvider, AppContextConsumer };
