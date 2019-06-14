import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div>
        <main>
          <article>
            <nav>
              <Link to='/login'>Login</Link>
              <br />
              <Link to='/register'>Register</Link>
              <br />
              <Link to='/dashboard'>Dashboard</Link>
              <br />
            </nav>
            <Route exact path='/login' component={Login} />
            <Route exact path='/dashboard' component={Dashboard} />
          </article>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
