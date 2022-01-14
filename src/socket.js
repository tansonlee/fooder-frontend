import io from "socket.io-client";
import { api } from "./env.js";

const socket = io(`${api}`, {
	reconnection: true,
	reconnectionDelay: 500,
	maxReconnectionAttempts: 120,
});

export default socket;
