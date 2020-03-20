import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Icon } from '../../components/UI';
import ContactSidebar from './ContactSidebar';
import ContactFeed from './ContactFeed';
import { getContact } from '../../actions';

const ContactShowView = props => {
  const { contact = {}, getContact } = props;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getContact(props.match.params.id);
    setLoading(false);
  }, []);

  if (loading) return null;
  return (
    <main className="md:grid md:grid-cols-4 min-h-screen">
      <aside className="col-span-1 border-r border-gray-400">
        <ContactSidebar contact={contact} />
      </aside>
      <section className="bg-gray-200 col-span-2 py-5 relative">
        <ContactFeed contact={contact} />
      </section>
      <aside className="col-span-1 border-l border-gray-400">
        right sidebar
      </aside>
    </main>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    contact: state.entities.contacts[ownProps.match.params.id],
  };
};

const mapDispatchToProps = dispatch => ({
  getContact: async contactId => await dispatch(getContact(contactId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactShowView);
