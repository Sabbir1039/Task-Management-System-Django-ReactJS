
const refreshToken = async (refreshToken) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        const data = await response.json();
        const newAccessToken = data.access;

        localStorage.setItem('accessToken', newAccessToken);
        // console.log(`New token set: ${newAccessToken}`)
        return newAccessToken;

    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
}

export {refreshToken};
