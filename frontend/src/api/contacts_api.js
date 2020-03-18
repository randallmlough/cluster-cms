import API from ".";
const contactsAPI = new API("/contacts");

export const fetchContact = async id =>
  await contactsAPI.get(`/${id}`);

export const fetchContacts = async () => 
  await contactsAPI.get("/");

export const newContact = async contact =>
  await contactsAPI.post("/", contact);

export const changeContact = async contact =>
  await contactsAPI.put(`/${contact.id}`, contact);

export const delContact = async contact =>
  await contactsAPI.delete(`/${contact.id}`)
