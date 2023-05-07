import '../App.css';

const MessageBox = ({ username, body }) => {
  return (
    <div className="message-box mb-3 flex">
      <p className='msg-username'>{username}</p>
      <p className='msg-body'>{body}</p>
    </div>
  );
}

const ContentField = () => {
  return (
    <div className='content-field'>
      <MessageBox
        username="John"
        body="aaaaaaaaaaaaaaaa"
      />
      <MessageBox
        username="John"
        body="aaaaaaaaaaaaaaaa"
      />
      <MessageBox
        username="John"
        body="aaaaaaaaaaaaaaaa"
      />
    </div>
  );
}

export default ContentField;
