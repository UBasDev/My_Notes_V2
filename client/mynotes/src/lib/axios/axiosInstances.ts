import axios from "axios";

const baseURL = `https://localhost:44327`;
const axiosCommonInstance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" }
});
const axiosAuthInstance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" }
});
const axiosInstances = {
  axiosCommonInstance,
  axiosAuthInstance,
};
export default axiosInstances;