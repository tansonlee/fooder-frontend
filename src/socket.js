import io from "socket.io-client";
import { api } from "./env.js";

const socket = io(`${api}`, {
	reconnection: true,
	reconnectionDelay: 20000,
	maxReconnectionAttempts: 120,
});

export default socket;
