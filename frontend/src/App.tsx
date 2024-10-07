import React from 'react';
import './App.css';

import { Router } from './routes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { NavBar } from './components/NavBar';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <div
            style={{
                backgroundColor: '#242424',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'auto',
            }}
        >
            <BrowserRouter>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <NavBar />
                    <Router />
                </LocalizationProvider>
            </BrowserRouter>
        </div>
    );
};

export default App;
