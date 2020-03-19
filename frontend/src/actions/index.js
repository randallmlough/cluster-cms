export const actions = {
  RECEIVE_USER_SESSION: "RECEIVE_USER_SESSION",
  REMOVE_USER_SESSION: "REMOVE_USER_SESSION",
  RECEIVE_CONTACTS: "RECEIVE_CONTACTS",
  RECEIVE_CONTACT: "RECEIVE_CONTACT",
  RECEIVE_CONTACT_ERRORS: "RECEIVE_CONTACT_ERRORS",
  REMOVE_CONTACT: "REMOVE_CONTACT",
  RECEIVE_EMAILS: "RECEIVE_EMAILS",
  RECEIVE_EMAIL: "RECEIVE_EMAIL",
  RECEIVE_EMAIL_ERRORS: "RECEIVE_EMAIL_ERRORS"
};

export {
  registerUserAction,
  authenticateUserAction,
  removeUserSessionAction,
  receiveUserSession
} from "./session_actions";

export {
  createContact,
  deleteContact,
  getContact,
  getContacts,
  updateContact
} from './contact_actions';

export {
  getEmail,
  getEmails,
  createEmail
} from './email_actions';
