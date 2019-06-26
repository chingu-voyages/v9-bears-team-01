import React from 'react';

import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Login from './Login';
import Dashboard from './Dashboard';
import Register from './Register';
import { AppContextProvider } from '../contexts/AppContext';
class App extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { modalShow: false, stocks: [] };
  }

  render() {
    return (
      <AppContextProvider>
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
      </AppContextProvider>
    );
  }
}

export default App;
