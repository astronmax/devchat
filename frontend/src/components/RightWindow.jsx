import { useDispatch, useSelector } from "react-redux";
import {
  selectUserlistDisplay,
  selectSidebarDisplay,
  selectConversation,
  selectCurrentUser
} from "../MainWindowSlice";
import { noUserlistDisplay } from "../MainWindowSlice";
import { useState } from "react";

const addDirect = (user_id, current_user) => {
  console.log("Add direct with user: ", user_id);
  // add direct logic...
}

const addUserInGroup = (user_id, group_id) => {
  console.log("Add user ", user_id, " in group");
  // add user in group logic...
}

export const UserComponent = ({ user }) => {
  const sidebar_display = useSelector(selectSidebarDisplay);
  const current_user = useSelector(selectCurrentUser);
  const group_id = useSelector(selectConversation);

  return (
    <div className="p-0 m-0 mb-2">
      <a className="text-decoration-none link-secondary" onClick={() => {
        sidebar_display ? addDirect(user.id, current_user) : addUserInGroup(user.id, group_id);
      }}>{user.username}</a>
    </div>
  );
}

const RightWindow = () => {
  const userlist_display = useSelector(selectUserlistDisplay);
  const dispatch = useDispatch();

  let users = [
    { username: "user_1", id: 1 },
    { username: "user_2", id: 2 },
    { username: "user_3", id: 3 }
  ];

  const [users_filtered, setUsers] = useState(users);

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
        <input type="text" id="search_user_input" className="form-control mb-3" onChange={() => {
          let pattern = document.getElementById("search_user_input").value;
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
