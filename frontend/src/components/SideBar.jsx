import '../App.css';

const Dropdown = ({ username }) => {
  return (
    <div className="dropdown">
      <a href="#" className="d-flex align-items-center link-light text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
        <strong>{username}</strong>
      </a>
      <ul className="dropdown-menu text-small shadow">
        <li><a className="dropdown-item" href="#">New group</a></li>
        <li><a className="dropdown-item" href="#">Start direct</a></li>
        <li><a className="dropdown-item" href="#">Invite in group</a></li>
        <li><hr className="dropdown-divider" /></li>
        <li><a className="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  );
}

const ListItem = () => {
  return (
    <li className="nav-item">
      <a href="#" className="nav-link link-light" aria-current="page">
        Group
      </a>
    </li>
  );
}

const SideMenu = ({ content }) => {
  return (
    <div className="sidebar d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4">{content}</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </ul>
      <hr />
      <Dropdown username="astron" />
    </div>
  );
}

export default SideMenu;
