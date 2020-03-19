import React from "react";
import { connect } from "react-redux";
import { Icon } from "../../components/UI";

const EmailsListView = props => {
  const { emails } = props;
  return (<>
    {Object.keys(emails).map(e => (
      <div key={emails[e].id} className="shadow rounded bg-white p-5 mb-6">
        <div className="flex justify-between mb-3">
          <div>
            <Icon icon="envelope" className="mr-4" />
            <span className="font-bold text-sm">Logged Email</span>
          </div>
          <span className="text-xs">{emails[e].date}</span>
        </div>
        <div className="px-8">
          <h3 className="font-bold mb-4">{emails[e].subject}</h3>
          <p className="text-sm">
            {emails[e].body}
          </p>
        </div>
      </div>
    ))}
  </>)
}

const mapStateToProps = state => ({
  emails: state.entities.emails
})

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EmailsListView);
