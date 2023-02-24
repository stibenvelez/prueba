import { io } from "socket.io-client";
import { getEnvVariables } from "../getEnvVariables";
const { VITE_BACKEND_URL } = getEnvVariables();

let socket = io.connect(VITE_BACKEND_URL);

export default socket;
