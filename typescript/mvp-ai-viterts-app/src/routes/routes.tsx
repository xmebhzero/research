import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import ProtectedRoute from './protectedRoutes';

// Layouts
import AuthLayout from '../layouts/authLayout';
import DashboardLayout from '../layouts/dashboardLayout';

// Pages
import LoginPage from '../pages/auth/login';
import HomePage from '../pages/home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
        ],
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: '',
            element: <HomePage />,
          },
        ],
      },
    ],
  },
]);
