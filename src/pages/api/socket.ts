import { Server as HttpServer } from "http";
import { NextApiRequest } from "next";
import { Server as IOServer } from "socket.io";
import { NextApiResponseServerIO } from "../../../types/types/next";

const handler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const httpserver: HttpServer = res.socket.server as any;
    const io = new IOServer(httpserver, {
      path: "/api/socket",
      addTrailingSlash: false,
    });

    res.socket.server.io = io;
  }

  res.end();
};

export default handler;
