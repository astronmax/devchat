import { useDispatch, useSelector } from 'react-redux';
import {
  selectSidebarDisplay,
  selectConversation,
  selectCurrentUser,
} from '../MainWindowSlice';
import {
  setUserlistDisplay
} from '../MainWindowSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Header = () => {
  const user_id = useSelector(selectCurrentUser);
  const sidebar_display = useSelector(selectSidebarDisplay);
  const conversation = useSelector(selectConversation);
  const dispatch = useDispatch();
  let [members_count, setMembersCount] = useState(0);
  useEffect(() => {
    if (sidebar_display == 0) {
      axios.get(`http://127.0.0.1:4000/api/group/get_users_count/${conversation}`)
        .then((resp) => setMembersCount(resp.data['users_count']));
    }
  }, [conversation]);

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
          <a href="/" className="me-4" onClick={(e) => {
            e.preventDefault();
            dispatch(setUserlistDisplay());
          }}>
            <img src="/icons/icon-plus.svg" width="25" height="25"></img>
          </a>
          <a href="/" className="me-4" onClick={async function () {
            if (sidebar_display == 1) {
              const url = `http://127.0.0.1:4000/api/user/delete_direct/${user_id}/${conversation}`;
              await axios.delete(url);
            } else {
              const url = `http://127.0.0.1:4000/api/group/delete_user/${user_id}/${conversation}`;
              await axios.delete(url);
            }
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