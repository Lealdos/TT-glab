import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
    return (
        <div>
            <h1>TT glab</h1>
            <p>Prueba tecnica glab</p>
            <Link to='/login'>Login</Link>
        </div>
    );
};
