import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AppContextProvider, AppContextConsumer } from '../contexts/AppContext';
class NavigationBar extends React.Component {
  render() {
    return (
      <AppContextConsumer>
        {({ user, logout }) => (
          <Navbar bg='primary' variant='dark'>
            <Navbar.Brand href='/'>Home</Navbar.Brand>
            <Navbar.Collapse>
              <Nav className='ml-auto'>
                {user == null ? (
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
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
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
        )}
      </AppContextConsumer>
    );
  }
}
export default NavigationBar;
