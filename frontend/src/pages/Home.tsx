import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <h1>TT glab</h1>
            <p>Prueba técnica glab</p>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
            <Link to='/dashboard'>Dashboard</Link>
        </div>
    );
};
