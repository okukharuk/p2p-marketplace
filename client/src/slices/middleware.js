import { toast } from "react-toastify";
import { isRejectedWithValue } from "@reduxjs/toolkit";

export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.warn("We got a rejected action!");
    toast.warn({
      title: "Async error!",
      message: "data" in action.error ? action.error.data.message : action.error.message,
    });
  }

  return next(action);
};
