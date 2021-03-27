import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './home/Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users/*" element={<div />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
