import {
  IAxiosErrorResponse,
  IUseFetch,
  IUseFetchReturn,
} from "@/types/interfaces/http";
import { httpError } from "@/types/interfaces/httpError";
import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

const useFetch = <T>({
  url = "",
  method = "GET",
  body,
  start = true,
}: IUseFetch): IUseFetchReturn<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<httpError | null>(null);
  const [successfully, setSuccessfully] = useState<boolean>(false);

  function newAbortSignal(timeoutMs: number) {
    const abortController = new AbortController();
    setTimeout(() => abortController.abort(), timeoutMs || 0);
    return abortController;
  }

  const abortController = newAbortSignal(10000);
  const signal = abortController.signal;

  const handlerHttp = useCallback(() => {
    if (loading) return;

    setLoading(true);
    setError(null);
    setSuccessfully(false);
    setData(null);

    axios({
      method,
      url,
      data: JSON.stringify(body),
      signal: signal,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status >= 200 || res.status < 300) {
          setSuccessfully(true);
          setData(res.data);
          setError(null);
          return;
        }
        setSuccessfully(false);
        setData(null);
        setError({
          message: res.data.message ?? "Something was wrong",
          status: res.status,
        });
      })
      .catch((error) => {
        console.error(error);
        setSuccessfully(false);
        setData(null);
        if (axios.isAxiosError(error)) {
          setError({
            message:
              (error as AxiosError<IAxiosErrorResponse>).response?.data
                ?.message ??
              error.message ??
              "Something was wrong",
            status: error.status,
          });
        } else if (error instanceof Error) {
          setError({
            message: error.message ?? "Something was wrong",
          });
        } else {
          setError({
            message: "Something was wrong",
            status: 500,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, url, body, data]);

  const refresh = () => {
    handlerHttp();
  };

  useEffect(() => {
    if (start) {
      handlerHttp();
    }
    return () => {
      setLoading(false);
      setData(null);
      setError(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  useEffect(() => {
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    error,
    loading,
    data,
    refresh,
    successfully,
  };
};

export default useFetch;
