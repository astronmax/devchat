import '../App.css';
import SideBar from '../components/SideBar';
import ContentField from '../components/ContentField';
import AppFooter from '../components/AppFooter';
import Header from '../components/Header';
import RightWindow from '../components/RightWindow';
import { useSelector } from 'react-redux';

import {
  selectSidebarDisplay,
  selectConversation,
  selectCurrentUser
} from '../MainWindowSlice'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';

const MainPage = () => {
  const [newMessage, setNewMessage] = useState("");
  useWebSocket('ws://127.0.0.1:8080', {
    share: true,
    onMessage: (msg) => {
      setNewMessage(msg.data);
    }
  });

  const user_id = useSelector(selectCurrentUser);
  const [username, setUsername] = useState('');

  axios.get(`http://127.0.0.1:4000/api/user/get/${user_id}`)
    .then((resp) => setUsername(resp.data['name']));

  const sidebar_display = useSelector(selectSidebarDisplay);
  const content_type = sidebar_display ? "Directs" : "Groups";
  const [sidebar_items, setSidebarItems] = useState([{ title: '', id: 0, key: 0 }]);
  useEffect(() => {
    if (sidebar_display == 0) {
      axios.get(`http://127.0.0.1:4000/api/user/get_groups/${user_id}`)
        .then((resp) => setSidebarItems(resp.data['groups']));
    } else {
      axios.get(`http://127.0.0.1:4000/api/user/get_directs/${user_id}`)
        .then((resp) => setSidebarItems(resp.data['directs']));
    }
  }, [sidebar_display]);

  const conversation = useSelector(selectConversation);
  const [msgs, setMsgs] = useState([{ username: '', body: '', id: 0 }]);
  useEffect(() => {
    if (sidebar_display == 1) {
      axios.get(`http://127.0.0.1:4000/api/user/get_direct_msgs/${user_id}/${conversation}`)
        .then((resp) => setMsgs(resp.data['messages']));
    } else {
      axios.get(`http://127.0.0.1:4000/api/group/get_group_msgs/${conversation}`)
        .then((resp) => setMsgs(resp.data['messages']));
    }
  }, [conversation]);

  useEffect(() => {
    if (newMessage != "") {
      let json_msg = JSON.parse(newMessage);
      if (json_msg['type'] == 0) {
        if (json_msg['dst'] == conversation && json_msg['dst'] !== 0) {
          let new_item = { username: json_msg['username'], body: json_msg['body'], id: json_msg['id'] }
          setMsgs([...msgs, new_item]);
        }
      } else {
        if (json_msg['dst'] !== 0) {
          if ((json_msg['src'] == user_id && json_msg['dst'] == conversation) ||
            (json_msg['src'] == conversation && json_msg['dst'] == user_id)) {

            let new_item = { username: json_msg['username'], body: json_msg['body'], id: json_msg['id'] }
            setMsgs([...msgs, new_item]);
          }
        }
      }
    }
  }, [newMessage]);

  return (
    <div className='d-flex'>
      <SideBar
        username={username}
        content_type={content_type}
        items={sidebar_items}
      />
      <div className='content-block'>
        <Header />
        <ContentField messages={msgs} />
        <AppFooter />
      </div>
      <RightWindow />
    </div>
  );
}

export default MainPage;
