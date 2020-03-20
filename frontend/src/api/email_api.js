import API from ".";
const emailAPI = new API("/email");

export const fetchEmail = async id =>
  await emailAPI.get(`/${id}`);

/*
 * args: {q, nextPageToken}
 * q: GMail Search compliant string
 * nextPageToken: as given in a previous response
*/
export const fetchEmails = async args => {
  let path = "/?";
  if (args) {
    for (let p in args) {
      path += `${p}=${args[p]}&`
    }
  }
  return await emailAPI.get(path);
}

/*
 * email: {to, subject, body, ?date}
*/
export const sendEmail = async email =>
  email.date
    ? await emailAPI.post("/schedule", email)
    : await emailAPI.post("/", email);
