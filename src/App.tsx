import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from './components/Layout';
import MainPage from './pages/MainPage/MainPage';
import NotFound from './pages/NotFound/NotFound';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to='/search' replace />} />
          <Route path='/search' element={<MainPage />}>
            <Route path=':searchQuery' element={<MainPage />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};
