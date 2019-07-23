import React, { Component } from 'react';
import axios from 'axios';

import { withRouter } from 'react-router-dom';
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

  updateStock = async stock => {
    const res = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=
      ${stock.ticker}&apikey=1L6GZW4SFVR1BCVB`);

    let stockReturn = null;
    let currentPrice = null;
    if (res.data) {
      currentPrice = res.data['Global Quote']['05. price'];
      stockReturn = (currentPrice - stock.price) / stock.price;
    }
    return { ...stock, currentPrice, return: stockReturn };
  };

  getStocks = async () => {
    const token = localStorage.token;
    try {
      if (this.state.user !== null) {
        const response = await axios.get('/api/stocks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // console.log('response data:', response.data);

        const newStocks = await Promise.all(
          response.data.map(stock => this.updateStock(stock))
        );
        console.log('new stocks', newStocks);
        // const newStocks = this.state.stocks.map( stock => async ({
        //   ...stock,
        //   currentPrice: await this.getCurrentPrice(stock.ticker)
        // }));
        await this.setState({ stocks: newStocks });

        // await this.setState(prevState => ({
        //   ...prevState,
        //   stocks: response.data
        // }));
        // await this.setState({ stocks: response.data });
        console.log('app state: ', this.state);
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
        // console.log('check user response data:', response.data);
        await this.setState({ user: response.data });
      }
    } catch (e) {
      console.log('app componenet did mount error:', e);
    }
  }

  async componentDidMount() {
    await this.checkUser();
    await this.getStocks();
    console.log('app state component did mount: ', this.state);
  }

  render() {
    return (
      <AppContext.Provider value={{ ...this.state, getStocks: this.getStocks }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
const AppContextConsumer = withRouter(AppContext.Consumer);
export { AppContextProvider, AppContextConsumer, AppContext };
