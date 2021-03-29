import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import { graphql } from './graphql';
import { UserInfo } from './auth/UserInfo';
import { Router } from './navigation/Router';
import { Navigation } from './navigation/Navigation';

function App() {
  return (
    <div className="App">
      <ApolloProvider client={graphql}>
        <BrowserRouter>
          <UserInfo />
          <Router />
          <Navigation />
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

export default App;
