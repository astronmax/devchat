import '../App.css';
import SideBar from '../components/SideBar';
import ContentField from '../components/ContentField';
import AppFooter from '../components/AppFooter';
import Header from '../components/Header';

const MainPage = () => {
  return (
    <div className='d-flex'>
      <SideBar content="Groups" />
      <div className='content-block'>
        <Header />
        <ContentField />
        <AppFooter />
      </div>
    </div>
  );
}

export default MainPage;