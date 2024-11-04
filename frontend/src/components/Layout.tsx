import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
    return (
        <Container>
            <Outlet />
        </Container>
    );
};
