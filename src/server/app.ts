import { createServer } from "http";
import { Server } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "@/types/socket";
import {
  create_network,
  delete_network,
  find_network,
  update_network,
} from "@/server/controllers/network";
import { delete_ip, update_ip } from "./controllers/ip";
import { login } from "./controllers/user";

const httpServer = createServer();

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: { origin: "*" },
});

const loginSet = new Set();

io.on("connection", (socket) => {
  if (!loginSet.has(socket.id)) {
    socket.on("login", async (data, callback) => {
      const result = await login(data);
      if (result.success) {
        loginSet.add(socket.id);
      }
      callback(result);
    });
  } else {
    return;
  }

  socket.on("create_network", async (data, callback) => {
    const result = await create_network(data);
    callback(result);
  });

  socket.on("find_network", async (data, callback) => {
    const result = await find_network(data);
    callback(result);
  });

  socket.on("delete_network", async (id, callback) => {
    const result = await delete_network(id);
    callback(result);
  });

  socket.on("update_network", async (data, callback) => {
    const result = await update_network(data);
    callback(result);
  });
  socket.on("delete_ip", async (data, callback) => {
    const result = await delete_ip(data);
    callback(result);
  });
  socket.on("update_ip", async (data, callback) => {
    const result = await update_ip(data);
    callback(result);
  });
});

httpServer.listen(3000);
console.log("server run at localhost:3000");
