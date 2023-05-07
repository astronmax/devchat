import '../App.css';

const MessageBox = ({ username, body }) => {
  return (
    <div className="message-box mb-3 flex">
      <p className='msg-username'>{username}</p>
      <p className='msg-body'>{body}</p>
    </div>
  );
}

const ContentField = ({ messages }) => {
  return (
    <div className='content-field'>
      {messages.map((msg) => {
        return (
          <MessageBox
            username={msg.username}
            body={msg.body}
            key={msg.id}
          />
        );
      })}
    </div>
  );
}

export default ContentField;
