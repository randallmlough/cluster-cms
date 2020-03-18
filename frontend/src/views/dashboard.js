import React from "react";
import { connect, useDispatch } from "react-redux";
import { fetchEmail, fetchEmails, sendEmail } from "../api"
import { createContact } from '../actions'

const Dashboard = props => {
  // const dispatch = useDispatch();
  // // debugger

  // dispatch(createContact({
  //   name: "Randy Lough",
  //   email: "randylough@me.com"
  // }));
  setTimeout(() => {
    // fetchEmails()
    //   .then(res => {
    //     console.log(res.data.messages);
    //     let id = res.data.messages[0].id;
    //     fetchEmail(id)
    //       .then(res => {
    //         console.log(res.headers)
    //         console.log(res.data);
    //       });
    //   })
    //   .catch(err => console.log(err));
    sendEmail({
      to: "jrbd93@gmail.com",
      subject: "boingus",
      body: "test"
    })
      .catch(err => console.log(err))
  }, 0);


  return (
    <main className="bg-gray-100">
      <header className="flex justify-between bg-white border-b border-gray-300 mx-auto px-12 py-6">
        <div>
          <h1 className="font-thin leading-tight text-4xl text-secondary-500">
            Dashboard
          </h1>
        </div>
        <div>
          <button className="bg-primary-500 hover:bg-primary-400 rounded-sm px-6 py-3 text-white">
            Add contact
          </button>
        </div>
      </header>
      <section className="px-12 py-12">
        <div className="shadow bg-white p-5 rounded">
          <h2 className="font-light text-3xl text-gray-800">Contacts</h2>
        </div>
      </section>
    </main>
  );
};

const mapDispatchToProps = dispatch => ({});

export default connect(null, mapDispatchToProps)(Dashboard);
