import React from 'react';
import LogoutMessage from './logoutMessage';
import { NavLink, useNavigate } from "react-router-dom";

const handleLogout = () => {
    // Perform logout actions (e.g., clear authentication tokens, reset user state)
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

const LogoutComponent = () => {
    const navigate = useNavigate();
    // Call the handleLogout function when the component mounts
    React.useEffect(() => {
        handleLogout();
    }, []);

    const redirect = () => {
        navigate('/login');
        window.location.reload();
    };

    return (
        <>
            <LogoutMessage />
            {/* Your logout component UI */}
            <p>Login again?</p>
            <NavLink onClick={redirect} className="btn btn-sm mx-1 btn-secondary my-1 my-sm-0" to="/login">
                Login
            </NavLink>
        </>
    );
};

export default LogoutComponent;
