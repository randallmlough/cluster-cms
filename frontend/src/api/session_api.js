import API from ".";
const sessionAPI = new API("/users");

export const registerUser = async user =>
  await sessionAPI.post("/register", user);

export const authenticateUser = async credentials =>
  await sessionAPI.post("/login", credentials);
