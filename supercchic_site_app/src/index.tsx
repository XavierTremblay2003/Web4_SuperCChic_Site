import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import './index.css';

import ProtectedRoutes from './App/ProtectedRoutes';
import App from './App/App';
import CategoryView from './App/CategoryView';

import AuthRoutes from './Auth/AuthRoutes';
import AuthContainer from './Auth/AuthContainer';
import Login from './Auth/Login';
import Logout from './Auth/Logout';
import SignUp from './Auth/SignUp';

import NotFound from './NotFound';
import ProduitCard from './Epicerie/ProduitCard';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="" element={<App />}>
            <Route path="" element={<ProduitCard /> } />
            <Route path="category/:id" element={<CategoryView />} />
          </Route>
        </Route>
        <Route path="/auth" element={<AuthRoutes />}>
          <Route path="" element={<AuthContainer />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
