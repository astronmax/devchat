import '../App.css';
import SideMenu from '../components/SideBar';
import ContentField from '../components/ContentField';
import AppFooter from '../components/AppFooter';

const MainPage = () => {
  return (
    <div className='d-flex'>
      <SideMenu content="Groups" />
      <div className='content-block'>
        <ContentField />
        <AppFooter />
      </div>
    </div>
  );
}

export default MainPage;