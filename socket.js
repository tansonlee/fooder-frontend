import io from "socket.io-client";
import { api } from "./env.js";

const socket = io(`${api}`);

export default socket;
