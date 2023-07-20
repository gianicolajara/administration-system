/* import billWatchSocket from "@/lib/billWatchSocket";
import dbConfig from "@/lib/dbConntect";
import { NextApiResponseServerIO } from "@/types/types/next";
import { Server as HttpServer } from "http";
import { NextApiRequest } from "next";
import { Server as IOServer } from "socket.io";

const handler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const httpserver: HttpServer = res.socket.server as any;
    const io = new IOServer(httpserver, {
      path: "/api/socket",
      addTrailingSlash: false,
    });

    const db = dbConfig();
    db.connectDB();

    billWatchSocket(io);

    res.socket.server.io = io;
  }

  res.end();
};

export default handler;
 */
