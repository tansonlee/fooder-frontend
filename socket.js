import io from "socket.io-client";
import { ip } from "./env.js";

const socket = io(`http://${ip}:6021`);

export default socket;
