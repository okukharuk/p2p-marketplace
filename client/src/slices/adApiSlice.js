import { apiSlice } from "./apiSlice";
const ADS_URL = "/api/ads";

const buildQuery = (data) => {
  if (!data) return "";

  const query = Object.entries(data).reduce((prev, [key, value], index) => {
    return prev + `${index === 0 ? "" : "&"}${key}=${value}`;
  }, "");

  return query === "" ? query : "?" + query;
};

export const adApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (data) => ({
        url: `${ADS_URL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Ad"],
    }),
    delete: builder.mutation({
      query: (data) => ({
        url: `${ADS_URL}/delete`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Ad"],
    }),
    update: builder.mutation({
      query: (data) => ({
        url: `${ADS_URL}/update`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Ad"],
    }),
    get: builder.query({
      query: (data) => ({
        url: `${ADS_URL}/get${buildQuery(data)}`,
        method: "GET",
      }),
      providesTags: ["Ad"],
    }),
    list: builder.query({
      query: (data) => ({
        url: `${ADS_URL}/list${buildQuery(data)}`,
        method: "GET",
      }),
      providesTags: ["Ad"],
    }),
  }),
});

export const { useCreateMutation, useUpdateMutation, useDeleteMutation, useGetQuery, useListQuery } = adApiSlice;
