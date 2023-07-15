"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";

const Bills = () => {
  useEffect(() => {
    const socket = io("ws://localhost:3000", {
      reconnectionDelayMax: 10000,
      path: "/api/socket",
    });

    socket.on("connect", () => {
      console.log("SOCKET CONNECTED", socket.id);
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  return <div>Bills</div>;
};

export default Bills;
