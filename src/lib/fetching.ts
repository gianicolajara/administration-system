import { IAxiosErrorResponse } from "@/types/interfaces/http";
import { httpError } from "@/types/interfaces/httpError";
import axios, { AxiosError, AxiosResponse } from "axios";

interface IFetchingProps {
  url: string;
  data?: object;
  method?: "GET" | "POST" | "PUT" | "PATCH";
}

function newAbortSignal(timeoutMs: number) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);
  return abortController.signal;
}

const fetching = ({
  url,
  data,
  method = "GET",
}: IFetchingProps): Promise<AxiosResponse> => {
  return axios({
    method,
    url,
    data: JSON.stringify(data),
    signal: newAbortSignal(10000),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status >= 200 || res.status < 300) {
        return res;
      }

      throw {
        message: res.data.message ?? "Something was wrong",
        status: res.status,
      } as httpError;
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        throw {
          message:
            (error as AxiosError<IAxiosErrorResponse>).response?.data
              ?.message ??
            error.message ??
            "Something was wrong",
          status: error.status,
        } as httpError;
      } else {
        throw {
          message: "Something was wrong",
          status: 500,
        } as httpError;
      }
    });
};

export default fetching;
