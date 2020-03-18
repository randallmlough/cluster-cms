import React from "react";

const ContactSidebar = props => {
  const { contact } = props;
  return (
    <>
      <div className="border-b border-gray-300">
        <div className="p-5">
          <h1 className="font-light text-2xl text-center">{contact.name}</h1>
        </div>
      </div>
      <div className="p-5">
        <h5 className="font-semibold text-sm mb-8">About this contact</h5>
        <div>
          <div className="mb-4">
            <div className="text-xs font-semibold text-black-500">Name</div>
            <div>
              <p className="text-sm">{contact.name}</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-xs font-semibold text-black-500">Email</div>
            <div>
              <p className="text-sm">{contact.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactSidebar;
