import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
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
            <Outlet />
        </div>
    );
};
