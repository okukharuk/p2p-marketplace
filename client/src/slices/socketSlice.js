import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    emitSocket: (state, action) => {
      state.socket.emit();
    },
  },
});

export const { setSocket, emitSocket } = socketSlice.actions;

export default socketSlice.reducer;
