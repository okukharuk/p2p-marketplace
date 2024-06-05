import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  credentials: "include",
  baseUrl: "http://localhost:5000",
  prepareHeaders: (headers) => {
    headers.set("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.set("Access-Control-Allow-Credentials", true);
    headers.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    headers.set(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
    );
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Ad"],
  endpoints: (builder) => ({}),
});
