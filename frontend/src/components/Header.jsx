import { useDispatch, useSelector } from 'react-redux';
import {
  selectSidebarDisplay,
  selectConversation,
} from '../MainWindowSlice';
import {
  setUserlistDisplay
} from '../MainWindowSlice';

const getMembersCount = (group_id) => {
  return 20;
}

const exitFromGroup = () => {

}

const exitFromDirect = () => {

}

const Header = () => {
  const sidebar_display = useSelector(selectSidebarDisplay);
  const conversation = useSelector(selectConversation);
  const dispatch = useDispatch();
  let members_count = getMembersCount(conversation);

  return (
    <header className="flex px-3 mb-1 mt-2">
      <div className={`d-flex justify-content-${sidebar_display ? 'end' : 'between'}`}>
        {
          sidebar_display
            ?
            <></>
            :
            <p className="text-secondary m-0">Members: {members_count}</p>
        }
        <div>
          <a href="#" className="me-4" onClick={(e) => {
            e.preventDefault();
            dispatch(setUserlistDisplay());
          }}>
            <img src="/icons/icon-plus.svg" width="25" height="25"></img>
          </a>
          <a href="#" className="me-4" onClick={() => {
            sidebar_display ? exitFromDirect() : exitFromGroup();
          }}>
            <img src="/icons/icon-exit.svg" width="25" height="25"></img>
          </a>
        </div>
      </div>
      <hr />
    </header >
  );
}

export default Header;