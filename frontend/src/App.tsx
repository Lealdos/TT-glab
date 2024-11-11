import React from 'react';
import './App.css';

import { Router } from './routes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <AuthProvider>
                    <Router />
                </AuthProvider>
            </LocalizationProvider>
        </BrowserRouter>
    );
};

export default App;
