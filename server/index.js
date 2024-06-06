import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { Server } from "socket.io";

dotenv.config();

import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import adRoutes from "./routes/adRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

connectDB();

let corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};

const port = process.env.PORT || 5000;
const socketPort = process.env.SOCKET_PORT || 5001;

const app = express();

const online = new Set();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/ads", adRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const socketServer = app.listen(socketPort, () => console.log(`Socket started on port ${socketPort}`));
const socketIo = new Server(socketServer, {
  transports: ["websocket", "xhr-polling"],
  origins: "*:*",
});

socketIo.on("connection", (socket) => {
  let currentUser = 0;

  socket.on("user", (id) => {
    if (!online.has(id)) online.add(id);
    const user_clients = socketIo.sockets.adapter.rooms.get(id);
    socket.join(id);
    currentUser = id;
  });
  socket.on("offer", ({ user_id, data }) => {
    if (!currentUser) return;
    socketIo.to(user_id).emit(user_id, { type: "offer", data: data, user: currentUser });
  });
  socket.on("accept", ({ user_id, data }) => {
    if (!currentUser) return;
    socketIo.to(user_id).emit(user_id, { type: "accept", data: data, user: currentUser });
  });
  socket.on("user_out", (id) => {
    if (id === 0) return;
    const user_clients = socketIo.sockets.adapter.rooms.get(id);
    if (user_clients && user_clients.size === 1) online.delete(id);
  });
});

export const getOnline = () => {
  return online;
};

// POST /api/users -Register a user
// POST /api/users/auth -Authenticate a user and get token
// POST /api/users/logout -Logout user and clear cookie
// GET /api/users/profile -get user profile
// PUT /api/users/profile -update profile
