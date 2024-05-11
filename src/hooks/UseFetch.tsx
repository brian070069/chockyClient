import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useFetch = (
  url: string,
  dependancies: any[] = [],
  headers: any = {}
) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(url, headers);

      setIsLoading(false);
      setHasError(false);
      setData(response.data);
    } catch (error: any) {
      setIsLoading(false);
      setHasError(true);
      if (error.request.status === 401) {
        navigate("/login");
        localStorage.clear();
      }
    }
  };

  useEffect(() => {
    getData();
  }, dependancies);

  return {
    data,
    isLoading,
    hasError,
  };
};
