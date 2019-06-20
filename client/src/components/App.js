import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  return (
    <BrowserRouter>
      <div>
        <main>
          <article>
            <Navbar bg="primary" variant="dark">
              <Navbar.Brand href="">Brand</Navbar.Brand>
              <Navbar.Collapse>
                <Nav className="ml-auto">
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
            <Route exact path='/login' component={Login} />
            <Route exact path='/dashboard' component={Dashboard} />
          </article>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
