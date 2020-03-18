import React, { useState } from "react";
import { connect } from "react-redux";
import { createContact } from "../../../actions";

const initialState = {
  email: "",
  name: "",
  last_name: "",
  phone_number: "",
  job_title: ""
};
const NewContact = props => {
  const { submit, formClassName } = props;
  const [contact, setContact] = useState(initialState);

  const handleSubmit = e => {
    e.preventDefault();
    submit(contact);
  };

  return (
    <form onSubmit={handleSubmit} className={formClassName}>
      <label
        htmlFor="email"
        className="font-semibold text-black-500 text-xs mb-3"
      >
        <span className="block mb-1">Email</span>
        <input
          className="bg-gray-100 block border border-gray-400 px-2 py-2 rounded-sm w-full focus:border-2 focus:border-secondary-300 focus:outline-none"
          type="email"
          name="email"
          id="email"
          value={contact.email}
          onChange={e => setContact({ ...contact, email: e.target.value })}
        />
      </label>
      <label
        htmlFor="firstName"
        className="font-semibold text-black-500 text-xs mb-3"
      >
        <span className="block mb-1">First Name</span>
        <input
          className="bg-gray-100 block border border-gray-400 px-2 py-2 rounded-sm w-full focus:border-2 focus:border-secondary-300 focus:outline-none"
          type="text"
          name="name"
          id="firstName"
          value={contact.name}
          onChange={e => setContact({ ...contact, name: e.target.value })}
        />
      </label>
      <label
        htmlFor="lastName"
        className="font-semibold text-black-500 text-xs mb-3"
      >
        <span className="block mb-1">Last Name</span>
        <input
          className="bg-gray-100 block border border-gray-400 px-2 py-2 rounded-sm w-full focus:border-2 focus:border-secondary-300 focus:outline-none"
          type="text"
          name="last_name"
          id="lastName"
          value={contact.lastName}
          onChange={e => setContact({ ...contact, last_name: e.target.value })}
        />
      </label>
      <label
        htmlFor="phoneNumber"
        className="font-semibold text-black-500 text-xs mb-3"
      >
        <span className="block mb-1">Phone Number</span>
        <input
          className="bg-gray-100 block border border-gray-400 px-2 py-2 rounded-sm w-full focus:border-2 focus:border-secondary-300 focus:outline-none"
          type="text"
          name="phone_number"
          id="phoneNumber"
          value={contact.phoneNumber}
          onChange={e =>
            setContact({ ...contact, phone_number: e.target.value })
          }
        />
      </label>
      <label
        htmlFor="jobTitle"
        className="font-semibold text-black-500 text-xs mb-8"
      >
        <span className="block mb-1">Job Title</span>
        <input
          className="bg-gray-100 block border border-gray-400 px-2 py-2 rounded-sm w-full focus:border-2 focus:border-secondary-300 focus:outline-none"
          type="text"
          name="job_title"
          id="jobTitle"
          value={contact.jobTitle}
          onChange={e => setContact({ ...contact, job_title: e.target.value })}
        />
      </label>
      <button
        type="submit"
        className="block w-full bg-primary-500 hover:bg-primary-300 text-white py-3 rounded-sm"
      >
        Create Contact
      </button>
    </form>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  submit: contact => dispatch(createContact(contact))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewContact);
