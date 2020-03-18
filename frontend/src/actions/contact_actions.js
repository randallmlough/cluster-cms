import { actions } from "./index"
import { fetchContacts, fetchContact, newContact,
  changeContact, delContact, formatError } from '../api';

const receiveContacts = contacts => ({
  type: actions.RECEIVE_CONTACTS,
  contacts
});

const receiveContact = contact => ({
  type: actions.RECEIVE_CONTACT,
  contact
});

const receiveContactErrors = errors => ({
  type: actions.RECEIVE_CONTACT_ERRORS,
  errors
})

const removeContact = id => ({
  type: actions.REMOVE_CONTACT,
  id
});

export const getContacts = () => async dispatch =>
  await fetchContacts()
    .then(contacts => dispatch(receiveContacts(contacts)))
    .catch(err => Promise.reject(formatError(err)));

export const getContact = id => async dispatch =>
  await fetchContact(id)
    .then(contact => dispatch(receiveContact(contact)))
    .catch(err => Promise.reject(formatError(err)));

export const createContact = contact => async dispatch => 
  await newContact(contact)
    .then(contact => dispatch(receiveContact(contact)))
    .catch(err => receiveContactErrors(err));

export const updateContact = contact => async dispatch => 
  await changeContact(contact)
    .then(contact => dispatch(receiveContact(contact)))
    .catch(err => receiveContactErrors(err));

export const deleteContact = contact => async dispatch => 
  await delContact(contact)
    .then(res => dispatch(removeContact(contact.id)))
    .catch(err => Promise.reject(formatError(err)));
