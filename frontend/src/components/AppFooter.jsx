import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import '../App.css';
import { useSelector } from 'react-redux';
import { selectConversation, selectCurrentUser, selectSidebarDisplay } from '../MainWindowSlice';
import { WS_URL } from '../App';

const AppFooter = () => {
  const { sendMessage } = useWebSocket(WS_URL, {
    share: true,
  });

  const sidebar_display = useSelector(selectSidebarDisplay);
  const user_id = useSelector(selectCurrentUser);
  const conversation = useSelector(selectConversation);

  return (
    <div className='app-footer'>
      <input type='text' id='messageInput' className="form-control" placeholder='Enter message'></input>
      <a href="/" className='mx-3' onClick={(e) => {
        e.preventDefault();
        let text = document.getElementById('messageInput').value;
        let msg = { 'type': sidebar_display, 'src': Number(user_id), 'dst': conversation, 'body': text };
        sendMessage(JSON.stringify(msg));
        document.getElementById('messageInput').value = '';
      }}>
        <img src="/icons/icon-send-msg.svg" width="32" height="32"></img>
      </a>
    </div>
  );
}

export default AppFooter;
