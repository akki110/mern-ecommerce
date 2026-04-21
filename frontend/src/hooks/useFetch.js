import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useFetch = (url, initialMethod = "GET") => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const callApi = useCallback(async (method = initialMethod, body = null, customUrl = url) => {
        setLoading(true);
        setError(null);

        // Get the token from localStorage (if user is logged in)
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;

        try {
            const response = await axios({
                method,
                url: customUrl,
                data: body,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : "",
                },
            });
            setData(response.data);
            return response.data;
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "An error occurred";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [url, initialMethod]);

    useEffect(() => {
        // Only auto-run if method is GET and URL is provided
        if (url && initialMethod === "GET") {
            callApi();
        }
    }, [url, initialMethod, callApi]);

    return { data, loading, error, callApi };
};
