import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Icon } from "../../components/UI";
import DOMPurify from "dompurify";
import { getEmail } from "../../actions";

const Email = ({ email, getEmail }) => {
  const [loading, setLoading] = useState(false),
    [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setLoading(true);
    getEmail(email.id);
    setLoading(false);
  }, [loading]);

  if (loading) return null;
  return (
    <div className="shadow rounded bg-white p-5 mb-6">
      <div className="flex justify-between mb-3">
        <div>
          <Icon icon="envelope" className="mr-4" />
          <span className="font-bold text-sm">{email.from}</span>
        </div>
        <span className="text-xs">{email.date}</span>
      </div>
      <div className="px-8">
        <h3 className="font-bold mb-4 cursor-pointer" onClick={()=>setExpanded(!expanded)} >{email.subject}</h3>
        {!expanded
          ? <p className="text-sm cursor-pointer"
            onClick={()=>setExpanded(!expanded)}>
              {email.snippet}
            </p>
          : email.formattedBody
            ? <p className="text-sm" dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(email.formattedBody)
            }}></p>
            : <p className="text-sm">
            {email.body}
          </p>}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  emails: state.entities.emails
})

const mapDispatchToProps = dispatch => ({
  getEmail: async id => await dispatch(getEmail(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Email);
