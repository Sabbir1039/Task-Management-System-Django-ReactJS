import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogoutMessage = () => {
    const notify = () => {
        toast.success('You have successfully logged out');
    };

    // Call the notify function when the component mounts
    React.useEffect(() => {
        notify();
    }, []);

    return null; // This component doesn't render anything, it just displays the toast notification
};

export default LogoutMessage;
