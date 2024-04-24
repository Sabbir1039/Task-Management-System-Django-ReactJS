import { useState, useEffect } from "react";
import { refreshToken } from './token';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [shouldRefetch, setShouldRefetch] = useState(false); // New state for triggering refetch

    useEffect(() => {
        const abortCont = new AbortController();
        const accessToken = localStorage.getItem('accessToken');
        
        const fetchData = async () => {
            setIsPending(true);
            try {
                const response = await fetch(url, { 
                    signal: abortCont.signal,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });
                if (!response.ok) {

                    if(response.status === 401) {
                        try {
                            const newAccToken = await refreshToken(localStorage.getItem('refreshToken'));
                            // console.log("New token obtained");
                            const refreshedResponse = await fetch(url, {
                                signal: abortCont.signal,
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${newAccToken}`,
                                }
                            });
                            if(!refreshedResponse.ok) {
                                throw new Error('Resource not found');
                            }
                            const refreshData = await refreshedResponse.json();
                            setData(refreshData);
                            setError(null);
                            setIsPending(false);
                        } catch (error) {
                            setError(error.message);
                        }
                    }

                    throw new Error("Resource not found");
                }
                const data = await response.json();
                setError(null);
                setData(data);
                setIsPending(false);

            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Fetch Aborted");
                } else {
                    setIsPending(false);
                    setError(error.message);
                    setData(null);
                }
            }
        };

        fetchData(); // Fetch data initially

        return () => { abortCont.abort() };
    }, [url, shouldRefetch]); // Include shouldRefetch in the dependency array

    // Function to trigger refetch
    const refetch = () => {
        setShouldRefetch(prevState => !prevState);
    };

    return { data, isPending, error, refetch };
};

export default useFetch;
