import '../App.css';

const handleSubmit = (event) => {
  if (event.keyCode == 13) {
    console.log("SEND MESSAGE");
  }
}

const AppFooter = () => {
  return (
    <div className='app-footer'>
      <input type='text' className="form-control" onKeyUp={handleSubmit}></input>
      <a href="#" type='submit' className='mx-3'>
        <img src="/icons/icon-send-msg.svg" width="32" height="32"></img>
      </a>
    </div>
  );
}

export default AppFooter;
