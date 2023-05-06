import '../App.css';

const MessageBox = ({ username, body }) => {
  return (
    <div className='message-box'>
      <p className='h5 text-success'>{username}</p>
      <p>{body}</p>
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
    </div>
  );
}

export default ContentField;
