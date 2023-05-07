import { useState } from "react";

const UserComponent = ({ username }) => {
  return (
    <div className="p-0 m-0 mb-2">
      <a className="text-decoration-none link-secondary">{username}</a>
    </div>
  );
}

const RightWindow = ({ users }) => {
  let [display, setDisplay] = useState(true);
  let class_str = `right-window flex-column p-3 ${display ? 'd-flex' : 'd-none'}`

  return (
    <div className={class_str}>
      <div className="d-flex align-items-center mb-3">
        <p className="fs-6 m-0 p-0">Select user</p>
        <a href="#" onClick={() => setDisplay(false)}>
          <img src="/icons/icon-cross.svg" width="40" height="40"></img>
        </a>
      </div>
      <input type="text" className="form-control mb-3" placeholder="User name" />
      <div className="users-list">
        {users}
      </div>
    </div>
  );
}

export default RightWindow;
