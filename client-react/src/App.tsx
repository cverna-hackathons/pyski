import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './home/Home';
import { Signup } from './auth/Signup';
import { ApolloProvider } from '@apollo/client';
import { graphql } from './graphql';

function App() {
  return (
    <div className="App">
      <ApolloProvider client={graphql}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<h1>Login now!</h1>} />
            <Route path="signup" element={<Signup />} />
          </Routes>
          <Link to="/">Home</Link> | {''}
          <Link to="login">Login</Link> | {''}
          <Link to="signup">Signup</Link>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

export default App;
