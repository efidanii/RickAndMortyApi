import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false),
    [error, setError] = useState(null),
    request = useCallback(
      async (
        url,
        method = "GET",
        body = null,
        headers = { "Content-Type": "application/json" }
      ) => {
        setLoading(true);

        try {
          const response = await fetch(url, (method, body, headers));
          if (!response.ok) {
            throw new Error(`Could not fetch ${url}`);
          }

          const data = await response.json();

          setLoading(false);
          return data;
        } catch (e) {
          setLoading(false);
          setError(e.message);
          throw e;
        }
      },
      []
    );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, clearError, error };
};
