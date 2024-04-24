import { refreshToken } from "./token";

const refreshAccessTokenAutomatically = async () => {
    const token = await refreshToken();
    if(token) {
        console.log('Token refreshed automatically!');
    } else {
        console.log('Error while refresh access token!')
    }
}

setInterval(() => {
    refreshAccessTokenAutomatically();
}, 40000);