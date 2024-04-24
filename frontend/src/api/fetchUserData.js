import { refreshToken } from "./token";

const fetchUserData = async (url) => {
    let data = null;

    const abortCont = new AbortController();

    try {
        const userId = localStorage.getItem('userId');
        const accessToken = localStorage.getItem('accessToken');

        const response = await fetch(`${url}/${userId}`, {
            signal: abortCont.signal,
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        if(!response.ok) {

            if(response.status === 401) {
                const refreshedData = await refreshData(url, userId);
                data = refreshedData;
            } else {
                throw new Error("Resource not found");
            }

        } else {
            data = await response.json();
        }
        
    } catch (error) {
        console.log("Error occured in fetchUserData: ", error.message);
    }
    
    return data;
}

async function refreshData(url, userId) {
    const newAccessToken = await refreshToken(localStorage.getItem('refreshToken'));
    const refreshResponse = await fetch(`${url}/${userId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${newAccessToken}`
        }
    });

    if(!refreshResponse.ok) {
        throw new Error('Resource not found!');
    }
    return await refreshResponse.json();
}

export default fetchUserData;