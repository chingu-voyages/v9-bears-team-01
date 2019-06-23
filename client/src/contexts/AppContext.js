import React, { Component } from 'react';
import axios from 'axios';
const AppContext = React.createContext();

class AppContextProvider extends Component {
  constructor(...args) {
    super(...args);

    this.state = { stocks: [] };
  }

  async componentDidMount() {
    console.log('app state component did mount: ', this.state);
    const token = localStorage.token;
    try {
      if (token) {
        const response = await axios.get('/api/stocks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('response data:', response.data);
        await this.setState({ stocks: response.data });
        console.log('app state: ', this.state);
      }
    } catch (e) {
      console.log('app componenet did mount error:', e);
    }
  }

  render() {
    return (
      <AppContext.Provider value={{ stocks: this.state.stocks }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
const AppContextConsumer = AppContext.Consumer;
export { AppContextProvider, AppContextConsumer };
