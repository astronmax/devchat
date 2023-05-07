import '../App.css';

const sendMsg = () => {
  console.log("SEND MSG");
}

const AppFooter = () => {
  return (
    <div className='app-footer'>
      <input type='text' className="form-control" placeholder='Enter message' onKeyUp={(event) => {
        if (event.keyCode == 13) {
          sendMsg();
        }
      }}></input>
      <a href="/" className='mx-3' onClick={(e) => {
        e.preventDefault();
        sendMsg();
      }}>
        <img src="/icons/icon-send-msg.svg" width="32" height="32"></img>
      </a>
    </div>
  );
}

export default AppFooter;
