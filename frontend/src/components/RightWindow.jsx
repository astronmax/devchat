import { useState } from "react";

const RightWindow = () => {
  let users = [
    'user_1', 'user_2', 'user_3',
    'user_1', 'user_2', 'user_3',
    'user_1', 'user_2', 'user_3',
    'user_1', 'user_2', 'user_3',
    'user_1', 'user_2', 'user_3',
    'user_1', 'user_2', 'user_3',
    'user_1', 'user_2', 'user_3',
    'user_1', 'user_2', 'user_3',
  ].map((user) => {
    return (
      <div className="p-0 m-0 mb-2">
        <a className="text-decoration-none link-secondary">{user}</a>
      </div>
    );
  });

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
      <input type="text" class="form-control mb-3" placeholder="User name" />
      <div className="users-list">
        {users}
      </div>
    </div>
  );
}

export default RightWindow;
