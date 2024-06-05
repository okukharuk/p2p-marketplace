import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queue: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUserToQueue: (state, action) => {
      state.queue = [...state.queue, action.payload];
    },
  },
});

export const { setGetPeer, setInitPeer } = chatSlice.actions;

export default chatSlice.reducer;
