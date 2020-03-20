import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import EmailContainer from "./Email";

const EmailsListView = props => {
  const { emails } = props,
    [emailIds, setEmailIds] = useState([]),
    [currentPage, setCurrentPage] = useState(1),
    [currentEmails, setCurrentEmails] = useState(emailIds.slice(0,5));

  useEffect(() => {
    let ids = Object.keys(emails);
    setEmailIds(ids);
  }, [Object.keys(emails).length]);

  useEffect(() => {
    let newCurrentEmails = [];
    emailIds.slice(0,5).forEach(e => {
      newCurrentEmails.push(emails[e]);
    })
    setCurrentEmails(newCurrentEmails);
  }, [emailIds, emails]);
  
  if (currentEmails.length === 0) return null;

  return (<>
    {currentEmails.map(e => (
      <EmailContainer email={e} key={e.id} />
    ))}
    Prev Next
  </>)
}

const mapStateToProps = state => ({
  emails: state.entities.emails
})

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EmailsListView);
