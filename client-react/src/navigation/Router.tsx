import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../home/Home';
import { Login } from '../auth/Login';
import { Signup } from '../auth/Signup';
import { ROUTES } from './Routes';

export const Router: React.FC = () => (
  <Routes>
    <Route path={ROUTES.HOME} element={<Home />} />
    <Route path={ROUTES.LOGIN} element={<Login />} />
    <Route path={ROUTES.SIGNUP} element={<Signup />} />
    <Route path={ROUTES.MATCHES} element={<div>Matches</div>} />
    <Route path={ROUTES.SETUP} element={<div>Setup</div>} />
    <Route path={ROUTES.LOGOUT} element={<div>Logout</div>} />
  </Routes>
);
