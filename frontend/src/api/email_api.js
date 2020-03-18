import API from ".";
const emailAPI = new API("/email");

export const fetchEmail = async id =>
  await emailAPI.get(`/${id}`);

export const fetchEmails = async args => {
  const path = "/?";
  if (args) {
    for (let p of args) {
      path += `${p}=${args[p]}&`
    }
  }
  return await emailAPI.get(path);
}

export const sendEmail = async email =>
  await emailAPI.post("/", email);
