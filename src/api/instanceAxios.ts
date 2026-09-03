import axios from "axios";
import { API_URL } from "../constants/url";

const query = axios.create({
  baseURL: API_URL,
});

export { query };
