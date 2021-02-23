import axios from "axios";

const URL = "http://localhost:5000/users";

export const fetchUsers = async () => axios.get(URL);

export const fetchUser = async (id) => axios.get(`${URL}/${id}`);

export const createUser = async (newUser) => axios.post(URL, newUser);

export const updateUser = async (id, updateUser) =>
  axios.put(`${URL}/${id}`, updateUser);

export const deleteUser = async (id) => axios.delete(`${URL}/${id}`);
