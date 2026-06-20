import { useState } from "react";

export const useApi = (apiFunc: () => Promise<any>) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async () => {
    setLoading(true);
    const response = await apiFunc();
    setLoading(false);

    !response.ok ? setError(true) : setError(false);
    setData(response.data);
    return response;
  };

  return { data, error, loading, request };
};
