import { actions } from "./index";
import {
  fetchEmail,
  fetchEmails,
  sendEmail,
  formatError
} from "../api";

const receiveEmails = emails => ({
  type: actions.RECEIVE_EMAILS,
  emails
});

const receiveEmail = email => ({
  type: actions.RECEIVE_EMAIL,
  email
});

const receiveEmailErrors = errors => ({
  type: actions.RECEIVE_EMAIL_ERRORS,
  errors
});

export const getEmails = args => async dispatch =>
  await fetchEmails(args)
    .then(resp => dispatch(receiveEmails(resp.data)))
    .catch(err => Promise.reject(formatError(err)));

export const getEmail = id => async dispatch =>
  await fetchEmail(id)
    .then(resp => dispatch(receiveEmail(resp.data)))
    .catch(err => {if (err.response.status === 400) dispatch(getEmail(id))});

export const createEmail = email => async dispatch =>
  await sendEmail(email)
    .then(resp => dispatch(receiveEmail(resp.data)))
    .catch(err => receiveEmailErrors(err));
