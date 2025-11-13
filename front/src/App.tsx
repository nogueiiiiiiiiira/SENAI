import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './hooks/useToast';
import AppRoutes from './AppRoutes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
