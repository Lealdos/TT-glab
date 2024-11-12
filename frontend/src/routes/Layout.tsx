import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const RouteAdminLayout: React.FC = () => {
    return (
        <Container>
            <Outlet />
        </Container>
    );
};
