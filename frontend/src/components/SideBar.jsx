import { useState } from 'react';
import '../App.css';
import axios from 'axios';

import {
  displayGroups,
  displayDirects,
  setConversation,
  selectSidebarDisplay,
  selectConversation,
  selectCurrentUser
} from '../MainWindowSlice'
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../App';

async function addGroup(user_id) {
  let new_grp_input = document.getElementById("new_group_input");
  let group_name = new_grp_input.value;

  let url = `${API_URL}/api/group/add/${group_name}/${user_id}?secret=secret`;
  await axios.post(url);

  window.location.reload();
}

const Signout = () => {
  document.cookie = `token=none&user_id=0`;
  window.location.reload();
}

const Dropdown = ({ username }) => {
  const dispatch = useDispatch();

  return (
    <div className="dropdown">
      <a href="/" className="d-flex align-items-center link-light text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
        <strong>{username}</strong>
      </a>
      <ul className="dropdown-menu text-small shadow">
        <li><a className="dropdown-item" onClick={(e) => {
          e.preventDefault();
          dispatch(displayGroups());
        }} href="/">Groups</a></li>
        <li><a className="dropdown-item" onClick={(e) => {
          e.preventDefault();
          dispatch(displayDirects());
        }} href="/">Directs</a></li>
        <li><hr className="dropdown-divider" /></li>
        <li><a className="dropdown-item" onClick={Signout} href="/">Sign out</a></li>
      </ul>
    </div>
  );
}

export const ListItem = ({ title, conversation_id }) => {
  const dispatch = useDispatch();
  const conversation = useSelector(selectConversation);

  let active = (conversation === conversation_id) ? 'active' : '';
  return (
    <li className="nav-item">
      <a href="/" className={`nav-link link-light ${active}`} onClick={(e) => {
        e.preventDefault();
        dispatch(setConversation(conversation_id));
      }}>
        <p className='sidebar-item'>{title}</p>
      </a>
    </li>
  );
}

const SideBar = ({ username, content_type, items }) => {
  const [display_add_group, setDisplayAddGroup] = useState(0);
  const sidebar_display = useSelector(selectSidebarDisplay);
  const user_id = useSelector(selectCurrentUser);

  return (
    <div className="sidebar d-flex flex-column flex-shrink-0 p-2 text-white">
      <div className='d-flex justify-content-between'>
        <a href="/" className="px-3 text-white text-decoration-none">
          {content_type}
        </a>
        {
          sidebar_display
            ?
            <></>
            :
            <a href="#" onClick={() => setDisplayAddGroup(!display_add_group)}>
              <img src="/icons/icon-plus-default.svg" width="25" height="25"></img>
            </a>
        }
      </div>
      {
        (display_add_group && !sidebar_display)
          ?
          <div className="px-3 mt-3 d-flex" id="display_add_group" style={{ height: "30px" }}>
            <input type="text" id="new_group_input" onKeyUp={async function (event) {
              if (event.keyCode == 13) {
                await addGroup(user_id);
              }
            }} className="form-control" placeholder="Name" />
            <button className='btn btn-primary btn-sm' onClick={async function () {
              await addGroup(user_id);
            }}>Add</button>
          </div>
          :
          <></>
      }
      <hr />
      <div className='sidebar-list'>
        <ul className="nav nav-pills flex-column mb-auto">
          {items.map((item => {
            return (
              <ListItem
                title={item.title}
                key={item.id}
                conversation_id={item.id}
              />
            );
          }))}
        </ul>
      </div>
      <hr />
      <Dropdown username={username} />
    </div>
  );
}

export default SideBar;
