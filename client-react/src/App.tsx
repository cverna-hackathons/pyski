import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import { graphql } from './graphql';
import { UserInfo } from './auth/UserInfo';
import { Router } from './navigation/Router';
import { Navigation } from './navigation/Navigation';
import { AuthorizationProvider } from './auth/Authorization';

function App() {
  return (
    <div className="App" data-testid="main-wrapper">
      <ApolloProvider client={graphql}>
        <BrowserRouter>
          <AuthorizationProvider>
            <UserInfo />
            <Router />
            <Navigation />
          </AuthorizationProvider>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

export default App;
