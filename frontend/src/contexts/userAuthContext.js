import { useState, useEffect, createContext } from "react";
import fetchUserData from "../api/fetchUserData";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchUserData('http://127.0.0.1:8000/api/users');
                setUserData(userData);
                if (userData.id) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.log('Error in userAuthContext: ', error.message);
            }
        };
        fetchData();
    }, []);

    const handleLogIn = () => {
        setIsLoggedIn(true);
    };
    const handleLogOut = () => {
        setIsLoggedIn(false);
    };

    const contextData = {
        userData: userData,
        isLoggedIn: isLoggedIn,
        handleLogIn: handleLogIn,
        handleLogOut: handleLogOut,
    }

    // console.log('ContextData: ',contextData);

    return(
        <UserContext.Provider value={ contextData }>
            { props.children }
        </UserContext.Provider>
    );
}

export default UserContextProvider;