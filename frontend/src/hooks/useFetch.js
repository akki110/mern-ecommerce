import { useState, useCallback } from "react";
import API from "../services/api";

/**
 * Custom hook to handle API calls with loading and error states
 * @param {string} url - Default endpoint URL
 * @returns {Object} { loading, error, callApi, data }
 */
export const useFetch = (url = "") => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(
    async ({ method = "GET", body = null, endpoint = url }) => {
      setLoading(true);
      setError(null);
      try {
        const response = await API({
          method,
          url: endpoint,
          data: body,
        });
        setData(response.data);
        return response.data;
      } catch (err) {
        const msg = err.response?.data?.message || err.message || "An error occurred";
        setError(msg);
        throw err; // Re-throw so the caller can handle it if needed
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  return { data, loading, error, callApi };
};
