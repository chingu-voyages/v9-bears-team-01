import React from 'react';

import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Login from './Login';
import Dashboard from './Dashboard';
import Register from './Register';
import Profile from './Profile';
import { AppContextProvider, AppContextConsumer } from '../contexts/AppContext';
class App extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { modalShow: false, stocks: [] };
  }

  getNavbar = values => {
    return (
      <Navbar bg='primary' variant='dark'>
        <Navbar.Brand href='/'>Home</Navbar.Brand>
        <Navbar.Collapse>
          <Nav className='ml-auto'>
            {values.user == null ? (
              <React.Fragment>
                <LinkContainer to='/login'>
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/register'>
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Nav.Link onClick={values.logout}>Logout</Nav.Link>
                <LinkContainer to='/dashboard'>
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/profile'>
                  <Nav.Link>Profile</Nav.Link>
                </LinkContainer>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  render() {
    return (
      <AppContextProvider>
        <AppContextConsumer>
          {values => {
            return (
              <BrowserRouter>
                <div>
                  <main>
                    <article>
                      {this.getNavbar(values)}
                      <Switch>
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/profile' component={Profile} />
                        <Route exact path='/dashboard' component={Dashboard} />
                        <Route exact path='/register' component={Register} />
                      </Switch>
                    </article>
                  </main>
                </div>
              </BrowserRouter>
            );
          }}
        </AppContextConsumer>
      </AppContextProvider>
    );
  }
}

export default App;
