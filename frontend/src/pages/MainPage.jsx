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
import { useState } from 'react';
import axios from 'axios';

const get_groups = () => {
  console.log("Getting groups...");
  return [
    { title: "group_1", id: 100 },
    { title: "group_2", id: 200 },
    { title: "group_3", id: 300 },
  ];
}

const get_directs = () => {
  console.log("Getting directs...");
  return [
    { title: "direct_1", id: 101 },
    { title: "direct_2", id: 201 },
    { title: "direct_3", id: 301 },
  ];
}

const get_direct_msgs = (id) => {
  console.log("Direct ", id);
  return [
    { username: "John", body: "AAA (direct)", id: 1 }
  ];
}

const get_group_msgs = (id) => {
  console.log("Group ", id);
  return [
    { username: "John", body: "AAA (group)", id: 1 }
  ];
}

const MainPage = () => {
  const user_id = useSelector(selectCurrentUser);
  console.log("USER:", user_id);
  const [username, setUsername] = useState('');

  axios.get(`http://127.0.0.1:4000/api/user/get/${user_id}`)
    .then((resp) => setUsername(resp.data['name']));

  const sidebar_display = useSelector(selectSidebarDisplay);
  const content_type = sidebar_display ? "Directs" : "Groups";
  let sidebar_items = sidebar_display ? get_directs() : get_groups();

  const conversation = useSelector(selectConversation);
  let msgs = sidebar_display
    ? get_direct_msgs(conversation)
    : get_group_msgs(conversation);

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
