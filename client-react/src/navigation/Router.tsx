import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../home/Home';
import { Login } from '../auth/Login';
import { Signup } from '../auth/Signup';
import { ROUTES } from './Routes';
import { Logout } from '../auth/Logout';
import { MatchSetup } from '../match/setup/MatchSetup';
import { MatchList } from '../match/list/MatchList';
import { RankingsList } from '../rankings/list/RankingList';
import { MatchDetail } from '../match/detail/MatchDetail';

export const Router: React.FC = () => (
  <div style={{ marginTop: '2em' }}>
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGNUP} element={<Signup />} />
      <Route path={ROUTES.MATCHES} element={<MatchList />} />
      <Route path={ROUTES.RANKINGS} element={<RankingsList />} />
      <Route path={ROUTES.MATCH} element={<MatchDetail />} />
      <Route path={ROUTES.SETUP} element={<MatchSetup />} />
      <Route path={ROUTES.LOGOUT} element={<Logout />} />
    </Routes>
  </div>
);
