import '../App.css';
import SideBar from '../components/SideBar';
import ContentField from '../components/ContentField';
import AppFooter from '../components/AppFooter';
import Header from '../components/Header';
import RightWindow from '../components/RightWindow';
import { useSelector } from 'react-redux';

import {
  selectSidebarDisplay,
  selectContentStore
} from '../MainWindowSlice'

const get_groups = () => {
  return [
    { title: "group_1", key: 1 },
    { title: "group_2", key: 2 },
    { title: "group_3", key: 3 },
  ];
}

const get_directs = () => {
  return [
    { title: "direct_1", key: 1 },
    { title: "direct_2", key: 2 },
    { title: "direct_3", key: 3 },
  ];
}

const get_direct_msgs = (id) => {
  return [
    { username: "John", body: "AAA (direct)", key: 1 }
  ];
}

const get_group_msgs = (id) => {
  return [
    { username: "John", body: "AAA (group)", key: 1 }
  ];
}

const MainPage = () => {
  const username = "astron";

  const sidebar_display = useSelector(selectSidebarDisplay);
  const content_type = sidebar_display ? "Directs" : "Groups";
  let sidebar_items = sidebar_display ? get_directs() : get_groups();

  const content_store_key = useSelector(selectContentStore);
  let msgs = sidebar_display
    ? get_direct_msgs(content_store_key)
    : get_group_msgs(content_store_key);

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
