import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './home/Home';
import { ApolloProvider } from '@apollo/client';
import { graphql } from './graphql';
import { Login } from './auth/Login';
import { Signup } from './auth/Signup';
import { UserInfo } from './auth/UserInfo';

function App() {
  return (
    <div className="App">
      <ApolloProvider client={graphql}>
        <BrowserRouter>
          <UserInfo />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
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
