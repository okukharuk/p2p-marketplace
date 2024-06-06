import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: {},
};

const adSlice = createSlice({
  name: "ad",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = { ...state.queue, [action.payload.key]: action.payload.value };
    },
    removeFilter: (state, action) => {
      const newState = { ...state };
      delete newState.filter[action.payload];
      return newState;
    },
  },
});

export const { setFilter, removeFilter } = adSlice.actions;

export default adSlice.reducer;
