import React, { useState } from 'react';
import { Icon } from '../../components/UI';
import { Tabs } from './tabs';
import NewEmail from './Form/NewEmail';
import { EmailFeed } from '../emails';

const ContactFeed = props => {
  const { contact } = props;

  const [showNewMessage, setShowNewMessage] = useState(false);
  return (
    <div>
      <Tabs>
        <div label="Activity" className="px-8">
          <h3 className="mb-4">Upcoming</h3>
          <EmailFeed />
        </div>
        <div label="Email" className="px-8">
          <div className="flex justify-end mb-8">
            {/* <button className="bg-gray-300 border border-gray-400 font-thin leading-6 px-4 py-1 rounded-sm text-xs ml-3 hover:bg-gray-200">
              Log Email
            </button> */}
            <button
              className="bg-black-500 text-white font-thin leading-6 px-4 py-1 rounded-sm text-xs border border-transparent ml-3 hover:bg-black-300"
              onClick={() => setShowNewMessage(true)}
            >
              Create Email
            </button>
          </div>
          <EmailFeed />
        </div>
      </Tabs>
      {showNewMessage && (
        <NewEmail contact={contact} close={() => setShowNewMessage(false)} />
      )}
    </div>
  );
};

export default ContactFeed;
