import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import { useSocket } from "./hooks/socket";

const App = () => {
  useSocket();

  return (
    <div className="h-screen">
      <Header />
      <ToastContainer />
      <Container className="my-2 mx-auto h-[92%] min-w-[92%]">
        <Outlet />
      </Container>
    </div>
  );
};

export default App;
