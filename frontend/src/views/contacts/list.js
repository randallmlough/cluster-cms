import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getContacts } from "../../actions";
import NewContact from "./Form/NewContact";
import { Link } from "react-router-dom";

const ContactsListView = props => {
  const { contacts, getContacts } = props;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getContacts();
    setLoading(false);
  }, [loading]);

  const formDrawer = useRef();
  const [showNewContactForm, setShowNewContactForm] = useState(false);
  useEffect(() => {
    function drawerListener(e) {
      console.log("form drawer");
      if (showNewContactForm) {
        if (formDrawer.current && formDrawer.current.contains(e.target)) {
          return;
        } else {
          setShowNewContactForm(false);
        }
      }
    }
    document.addEventListener("mousedown", drawerListener);
    return () => document.removeEventListener("mousedown", drawerListener);
  }, [showNewContactForm]);

  if (loading) return null;
  return (
    <main>
      <header className="px-10">
        <div className="flex justify-between border-b border-gray-300 mx-auto py-6">
          <div>
            <h1 className="font-light text-3xl text-gray-800">Contacts</h1>
          </div>
          <div>
            <button
              className="bg-primary-500 hover:bg-primary-400 rounded-sm px-6 py-3 text-white"
              onClick={() => setShowNewContactForm(true)}
            >
              Create contact
            </button>
          </div>
        </div>
      </header>
      <div className="flex px-10 py-5">
        <aside className="-ml-6 px-6">
          <nav>
            <ul>
              <li>All Contacts</li>
            </ul>
          </nav>
        </aside>
        <section className="flex-1 -ml-6 px-6">
          <table className="table-auto leading-normal mb-4 w-full border">
            <thead>
              <tr>
                <th className="bg-gray-200 border-b border-gray-300 border-r font-semibold px-4 py-2 text-black-500 text-left text-xs uppercase">
                  Name
                </th>
                <th className="bg-gray-200 border-b border-gray-300 border-r font-semibold px-4 py-2 text-black-500 text-left text-xs uppercase">
                  Email
                </th>
                <th className="bg-gray-200 border-b border-gray-300 border-r font-semibold px-4 py-2 text-black-500 text-left text-xs uppercase">
                  Phone Number
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.length ? (
                contacts.map((contact, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 border-b border-gray-300">
                      <Link
                        to={`/contacts/${contact.id}`}
                        className="text-secondary-500 hover:text-secondary-600"
                      >
                        {contact.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {contact.email}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300"></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-10">
                    <p>No contacts yet</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
      {showNewContactForm && (
        <div
          className="absolute bg-white inset-y-0 right-0 shadow-lg w-2/5"
          ref={formDrawer}
        >
          <div className="bg-secondary-500 flex justify-between mb-10 px-10 py-5 text-white">
            <div>Create contact</div>
            <button onClick={() => setShowNewContactForm(false)}>X</button>
          </div>
          <div className="px-10">
            <NewContact formClassName="flex flex-col" />
          </div>
        </div>
      )}
    </main>
  );
};

const mapStateToProps = state => {
  const contacts =
    state.entities && state.entities.contacts
      ? Object.values(state.entities.contacts)
      : [];
  return {
    contacts: contacts
  };
};

const mapDispatchToProps = dispatch => ({
  getContacts: async () => await dispatch(getContacts())
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsListView);
