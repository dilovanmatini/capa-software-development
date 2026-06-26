import { useEffect } from 'react';
import { logout } from '../services/auth';

function Logout() {
    useEffect(() => {
        logout();
        window.location.href = '/';
    }, []);

    return null;
}

export default Logout;
