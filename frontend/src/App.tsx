import React from 'react';
import './App.css';

import { Router } from './routes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import { Container } from '@mui/material';

const App: React.FC = () => {
    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'auto',
            }}
        >
            <BrowserRouter>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <AuthProvider>
                        <Router />
                    </AuthProvider>
                </LocalizationProvider>
            </BrowserRouter>
        </Container>
    );
};

export default App;
