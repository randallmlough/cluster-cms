import React, { useState } from 'react';
import { Icon } from '../../components/UI';
import { Tabs } from './tabs';
import NewEmail from './Form/NewEmail';

const ContactFeed = props => {
  const { contact } = props;

  const [showNewMessage, setShowNewMessage] = useState(false);
  return (
    <div>
      <Tabs>
        <div label="Activity" className="px-8">
          <h3 className="mb-4">Upcoming</h3>
          <div className="shadow rounded bg-white p-5 mb-6">
            <div className="flex justify-between mb-3">
              <div>
                <Icon icon="envelope" className="mr-4" />
                <span className="font-bold text-sm">Logged Email</span>
              </div>
              <span className="text-xs">{new Date().toString()}</span>
            </div>
            <div className="px-8">
              <h3 className="font-bold mb-4">Hello There</h3>
              <p className="text-sm">
                Hey Brian, I heard your company is in the market for a tasty
                cupcake supplier. We're the number one cupcake supplier in the
                world. If you're interested in talking about our pricing, let me
                know. Yours, randy "Cupcakes not to your taste? We also sell the
                best muffins and donuts."
              </p>
            </div>
          </div>
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
          <div className="shadow rounded bg-white p-5 mb-6">
            <div className="flex justify-between mb-3">
              <div>
                <Icon icon="envelope" className="mr-4" />
                <span className="font-bold text-sm">Logged Email</span>
              </div>
              <span className="text-xs">{new Date().toString()}</span>
            </div>
            <div className="px-8">
              <h3 className="font-bold mb-4">Hello There</h3>
              <p className="text-sm">
                Hey Brian, I heard your company is in the market for a tasty
                cupcake supplier. We're the number one cupcake supplier in the
                world. If you're interested in talking about our pricing, let me
                know. Yours, randy "Cupcakes not to your taste? We also sell the
                best muffins and donuts."
              </p>
            </div>
          </div>
        </div>
      </Tabs>
      {showNewMessage && (
        <NewEmail contact={contact} close={() => setShowNewMessage(false)} />
      )}
    </div>
  );
};

export default ContactFeed;
