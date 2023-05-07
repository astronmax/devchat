const Header = () => {
  return (
    <header className="flex px-3 mb-1 mt-2">
      <div className="d-flex justify-content-between">
        <a href="#" className="link-secondary text-decoration-none">Members: 30</a>
        <div>
          <a href="#" className="link-success text-decoration-none me-4">
            <img src="/icons/icon-plus.svg" width="25" height="25"></img>
          </a>
          <a href="#" className="link-danger text-decoration-none me-4">
            <img src="/icons/icon-exit.svg" width="25" height="25"></img>
          </a>
        </div>
      </div>
      <hr />
    </header>
  );
}

export default Header;