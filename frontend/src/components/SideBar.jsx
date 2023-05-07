import '../App.css';

const Dropdown = ({ username }) => {
  return (
    <div className="dropdown">
      <a href="/" className="d-flex align-items-center link-light text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
        <strong>{username}</strong>
      </a>
      <ul className="dropdown-menu text-small shadow">
        <li><a className="dropdown-item" href="/">Groups</a></li>
        <li><a className="dropdown-item" href="/">Directs</a></li>
        <li><hr className="dropdown-divider" /></li>
        <li><a className="dropdown-item" href="/">Sign out</a></li>
      </ul>
    </div>
  );
}

const ListItem = ({ title }) => {
  return (
    <li className="nav-item">
      <a href="/" className="nav-link link-light" aria-current="page">
        {title}
      </a>
    </li>
  );
}

const SideBar = ({ content }) => {
  return (
    <div className="sidebar d-flex flex-column flex-shrink-0 p-2 text-white">
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        {content}
      </a>
      <hr />
      <div className='sidebar-list'>
        <ul className="nav nav-pills flex-column mb-auto">
          <ListItem title="work" />
          <ListItem title="Nebula-XI" />
          <ListItem title="work" />
          <ListItem title="Nebula-XI" />
          <ListItem title="work" />
        </ul>
      </div>
      <hr />
      <Dropdown username="astron" />
    </div>
  );
}

export default SideBar;
