import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { createEmail } from '../../../actions';
import { connect } from 'react-redux';

const NewEmail = props => {
  const { contact, createEmail, close } = props;
  const initialState = {
    to: '',
    subject: '',
    body: '',
    date: new Date(),
  };
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState(initialState);
  const form = useRef();

  useEffect(() => {
    if (contact && contact.email) setMessage({ ...message, to: contact.email });
  }, [contact.email]);

  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const handleSubmit = e => {
    e.preventDefault();
    const email = {
      ...message,
      body: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    };
    createEmail(email).then(() => {
      close();
    });
  };

  const handleSendDate = date => {
    setMessage({ ...message, date: date });
  };
  return (
    <div
      className={
        'absolute bottom-0 right-0 shadow mr-4' +
        (isOpen ? ' w-8/12' : ' w-4/12')
      }
    >
      <header
        className="p-4 bg-secondary-500 flex justify-between cursor-pointer text-sm text-white rounded-t"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>Create Email</div>
        <div>
          <button onClick={() => close()}>X</button>
        </div>
      </header>
      {isOpen && (
        <>
          <section className="bg-white">
            <form ref={form}>
              <div className="border-b border-gray-300 px-5 pt-2 pb-1">
                <div className="flex justify-between">
                  <label className="-mx-2">
                    <span className="text-xs text-gray-600 text-thin block px-2">
                      To Email
                    </span>
                    <input
                      className="text-secondary-500 text-sm px-2 border border-transparent focus:border-secondary-200 focus:outline-none"
                      type="text"
                      value={message.to}
                      onChange={e =>
                        setMessage({ ...message, to: e.target.value })
                      }
                    />
                  </label>
                  <label className="-mx-2">
                    <span className="text-xs text-gray-600 text-thin block px-2">
                      Date
                    </span>
                    <DatePicker
                      className="text-secondary-500 text-sm w-full px-2 border border-transparent focus:border-secondary-200 focus:outline-none"
                      popperClassName="z-50"
                      selected={message.date}
                      onChange={handleSendDate}
                      showTimeSelect
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  </label>
                </div>
                <div>
                  <div className="-mx-2 ">
                    <input
                      className="text-secondary-500 text-sm px-2 py-1 w-full border border-transparent focus:border-secondary-200 focus:outline-none"
                      type="text"
                      placeholder="Subject"
                      value={message.subject}
                      onChange={e =>
                        setMessage({ ...message, subject: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <Editor
                  editorState={editorState}
                  onEditorStateChange={setEditorState}
                  toolbarClassName="text-xs"
                  wrapperClassName="demo-wrapper"
                  editorClassName="px-4 h-48"
                  toolbar={{
                    options: [
                      'inline',
                      'blockType',
                      'fontSize',
                      'fontFamily',
                      'emoji',
                      'list',
                      'textAlign',
                      'link',
                    ],
                    inline: {
                      inDropdown: true,
                      options: ['bold', 'italic', 'underline', 'strikethrough'],
                      className: 'text-xs z-40',
                    },
                    emoji: { className: 'z-40' },
                    list: { inDropdown: true, className: 'z-40' },
                    textAlign: { inDropdown: true, className: 'z-40' },
                    link: { inDropdown: true, className: 'z-40' },
                    blockType: {
                      className: 'px-1 w-20 z-40',
                      options: [
                        'Normal',
                        'H1',
                        'H2',
                        'H3',
                        'H4',
                        'H5',
                        'H6',
                        'Blockquote',
                      ],
                    },
                    fontSize: {
                      className: 'z-40',
                    },
                    fontFamily: {
                      options: [
                        'Arial',
                        'Georgia',
                        'Impact',
                        'Tahoma',
                        'Times New Roman',
                        'Verdana',
                      ],
                      className: 'w-16 z-40',
                    },
                  }}
                />
              </div>
            </form>
          </section>
          <footer className="border-t border-gray-400 px-4 py-3 bg-white">
            <button
              className="bg-primary-500 text-xs text-white font-thin px-4 py-2 rounded"
              onClick={handleSubmit}
            >
              Create email
            </button>
          </footer>
        </>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  createEmail: async email => await dispatch(createEmail(email)),
});

export default connect(null, mapDispatchToProps)(NewEmail);
