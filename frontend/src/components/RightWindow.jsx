import { useDispatch, useSelector } from "react-redux";
import {
  selectUserlistDisplay,
  selectSidebarDisplay,
  selectConversation,
  selectCurrentUser
} from "../MainWindowSlice";
import { noUserlistDisplay } from "../MainWindowSlice";
import { useState } from "react";
import axios from 'axios';

export const UserComponent = ({ user }) => {
  const sidebar_display = useSelector(selectSidebarDisplay);
  const current_user = useSelector(selectCurrentUser);
  const group_id = useSelector(selectConversation);

  return (
    <div className="p-0 m-0 mb-2">
      <a className="text-decoration-none link-secondary" onClick={() => {
        if (sidebar_display == 1) {
          axios.post(`http://127.0.0.1:4000/api/user/add_direct/${current_user}/${user.id}`);
        } else {
          axios.post(`http://127.0.0.1:4000/api/user/add_in_group/${user.id}/${group_id}`);
        }
        window.location.reload();
      }}>{user.username}</a>
    </div>
  );
}

const RightWindow = () => {
  const userlist_display = useSelector(selectUserlistDisplay);
  const user_id = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [users_filtered, setUsers] = useState([{ username: '', id: 0 }]);

  return (
    userlist_display
      ?
      <div className="right-window flex-column p-3 d-flex" >
        < div className="d-flex align-items-center mb-3" >
          <p className="fs-6 m-0 p-0">Select user</p>
          <a href="/" onClick={(e) => {
            e.preventDefault();
            dispatch(noUserlistDisplay());
          }}>
            <img src="/icons/icon-cross.svg" width="40" height="40"></img>
          </a>
        </div >
        <input type="text" id="search_user_input" className="form-control mb-3" onChange={async function () {
          let pattern = document.getElementById("search_user_input").value;
          let resp = (await axios.get(`http://127.0.0.1:4000/api/user/get_all/${user_id}`)).data;
          let users = resp['users'];
          let new_users = [];
          for (let i = 0; i < users.length; i++) {
            if (users[i].username.includes(pattern)) {
              new_users.push(users[i]);
            }
          }
          setUsers(new_users);
        }} placeholder="User name" />
        <div className="users-list">
          {users_filtered.map(user => <UserComponent user={user} key={user.id} />)}
        </div>
      </div >
      :
      <></>
  );
}

export default RightWindow;
