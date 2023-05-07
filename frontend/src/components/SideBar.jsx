import { useState } from 'react';
import '../App.css';

import {
  displayGroups,
  displayDirects
} from '../MainWindowSlice'
import { useDispatch } from 'react-redux';

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
        <li><a className="dropdown-item" href="/">Sign out</a></li>
      </ul>
    </div>
  );
}

export const ListItem = ({ title }) => {
  return (
    <li className="nav-item">
      <a href="/" className="nav-link link-light" aria-current="page">
        <p className='sidebar-item'>{title}</p>
      </a>
    </li>
  );
}

const SideBar = ({ username, content_type, items }) => {
  let [disp_add_group, setDisplayAddGroup] = useState('d-none');
  let add_group_classes = `px-3 mt-3 ${disp_add_group}`;

  const handleAddGroup = () => {
    disp_add_group === 'd-none' ? setDisplayAddGroup('d-flex') : setDisplayAddGroup('d-none');
  }

  return (
    <div className="sidebar d-flex flex-column flex-shrink-0 p-2 text-white">
      <div className='d-flex justify-content-between'>
        <a href="/" className="px-3 text-white text-decoration-none">
          {content_type}
        </a>
        <a href="#" onClick={handleAddGroup}>
          <img src="/icons/icon-plus-default.svg" width="25" height="25"></img>
        </a>
      </div>
      <div className={add_group_classes} style={{ height: "30px" }}>
        <input type="text" className="form-control" placeholder="Group name" />
        <button className='btn btn-primary btn-sm'>Add</button>
      </div>
      <hr />
      <div className='sidebar-list'>
        <ul className="nav nav-pills flex-column mb-auto">
          {items.map((item => { return (<ListItem title={item} key={item} />); }))}
        </ul>
      </div>
      <hr />
      <Dropdown username={username} />
    </div>
  );
}

export default SideBar;
