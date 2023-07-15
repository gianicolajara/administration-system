import { toast } from "react-toastify";
import { HttpErrorSlice } from "../../types/types/httpErrors";

export const httpErrorMessageHandle = (error: any) => {
  toast((error as HttpErrorSlice).message || "Algo fue mal", {
    type: "error",
    theme: "dark",
  });
};

export const httpSuccessMessageHandle = (message: string) => {
  toast(message, {
    type: "success",
    theme: "dark",
  });
};
