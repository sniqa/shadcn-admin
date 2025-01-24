import { io, Socket } from "socket.io-client";
import type { ClientToServerEvents, ServerToClientEvents } from "./types";

const URL = "localhost:3000";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(URL);
