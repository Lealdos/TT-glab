import { Route, Routes } from 'react-router-dom';

import { Home } from './../pages/Home.tsx';
import { Login } from './../pages/Login.tsx';
import { Dashboard } from './../pages/Dashboard.tsx';
import { Register } from './../pages/Register.tsx';
import { PrivateRoute } from './PrivateRoute';
import { Reservation } from './../pages/reservation';
export function Router(): React.ReactElement {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='reservation' element={<Reservation />} />
            <Route
                path='/dashboard'
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}
