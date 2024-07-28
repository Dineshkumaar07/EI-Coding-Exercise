import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/tasks",
});

export const addTask = (task) => api.post("/add", task);
export const removeTask = (id) => api.delete(`/remove/${id}`);
export const getTasks = () => api.get("/view");
export const updateTask = (id, updatedTask) =>
  api.put(`/edit/${id}`, updatedTask);
export const getTasksByPriority = (priority) =>
  api.get(`/view/priority/${priority}`);

export default api;
