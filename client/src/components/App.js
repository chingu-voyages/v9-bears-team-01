import React from 'react';

import './App.css';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';

import Login from './Login';
import Dashboard from './Dashboard';
import Register from './Register';
import StockContext from '../contexts/StockContext';

class App extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { modalShow: false, stocks: [] };
  }
  async componentDidMount() {
    console.log('app state component did mount: ', this.state);
    const token = localStorage.token;
    try {
      if (token) {
        const response = await axios.get('/api/stocks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        await this.setState({ stocks: response.data });
        console.log('app state: ', this.state);
      }
    } catch (e) {
      console.log('app componenet did mount error:', e);
    }
  }

  render() {
    return (
      <StockContext.Provider value={this.state.stocks}>
        <BrowserRouter>
          <div>
            <main>
              <article>
                <Navbar bg='primary' variant='dark'>
                  <Navbar.Brand href='/'>Home</Navbar.Brand>
                  <Navbar.Collapse>
                    <Nav className='ml-auto'>
                      <LinkContainer to='/login'>
                        <Nav.Link>Login</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/register'>
                        <Nav.Link>Register</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/dashboard'>
                        <Nav.Link>Dashboard</Nav.Link>
                      </LinkContainer>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
                <Switch>
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/dashboard' component={Dashboard} />
                  <Route exact path='/register' component={Register} />
                </Switch>
              </article>
            </main>
          </div>
        </BrowserRouter>
      </StockContext.Provider>
    );
  }
}

export default App;
