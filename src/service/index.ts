import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();

const api = axios.create({
  baseURL: "http://192.168.0.7:3333",
  headers: {
    Authorization: `Bearer ${cookies["@chat.token"]}`,
  },
});

export { api };
