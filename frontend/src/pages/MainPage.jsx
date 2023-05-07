import '../App.css';
import SideBar from '../components/SideBar';
import ContentField from '../components/ContentField';
import AppFooter from '../components/AppFooter';
import Header from '../components/Header';
import RightWindow from '../components/RightWindow';
import { useSelector } from 'react-redux';

import {
  selectSidebarDisplay
} from '../MainWindowSlice'

const get_groups = () => {
  return ["group_1", "group_2", "group_3"];
}

const get_directs = () => {
  return ["direct_1", "direct_2", "direct_3"];
}

const MainPage = () => {
  const username = "astron";
  const sidebar_display = useSelector(selectSidebarDisplay);
  const content_type = sidebar_display ? "Directs" : "Groups";
  const items = sidebar_display ? get_directs() : get_groups();

  return (
    <div className='d-flex'>
      <SideBar
        username={username}
        content_type={content_type}
        items={items}
      />
      <div className='content-block'>
        <Header />
        <ContentField />
        <AppFooter />
      </div>
      <RightWindow />
    </div>
  );
}

export default MainPage;
