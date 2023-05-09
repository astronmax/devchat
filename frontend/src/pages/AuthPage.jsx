import '../App.css';

const LoginPage = () => {
  return (
    <div>
      <div className="jumbotron text-center, mb-4">
        <h1>Welcome back!</h1>
      </div>
      <div className="form-outline mb-4">
        <input type="text" name="login" id="loginForm" className="form-control" />
        <label className="form-label" for="loginForm">Login</label>
      </div>
      <div className="form-outline mb-4">
        <input type="password" name="password" id="passwordForm" className="form-control" />
        <label className="form-label" for="passwordForm">Password</label>
      </div>
      <div className="row mb-4">
        <div className="col d-flex justify-content-center">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="remember" value="" checked />
            <label className="form-check-label" for="form2Example31"> Remember me </label>
          </div>
        </div>

        <div className="col">
          <a href="/" className='link-secondary text-decoration-none'>Sign Up</a>
        </div>
      </div>
      <div className="row">
        <button className="btn btn-primary btn-block mb-4">Sign in</button>
      </div>
    </div>
  );
}

const RegisterPage = () => {
  return (
    <div>
      <div className="jumbotron text-center, mb-4">
        <h1>Create account</h1>
      </div>
      <div className="container">
        <div className="form-outline mb-4">
          <input type="text" id="registerUsername" className="form-control" />
          <label className="form-label" for="registerUsername" style={{ marginLeft: "0px;" }}>Username</label>
          <div className="form-notch">
            <div className="form-notch-leading" style={{ width: "9px;" }}></div>
            <div className="form-notch-middle" style={{ width: "66.4px;" }}></div>
            <div className="form-notch-trailing"></div>
          </div>
        </div>
        <div className="form-outline mb-4">
          <input type="password" id="registerPassword" className="form-control" />
          <label className="form-label" for="registerPassword" style={{ marginLeft: "0px;" }}>Password</label>
          <div className="form-notch">
            <div className="form-notch-leading" style={{ width: "9px;" }}></div>
            <div className="form-notch-middle" style={{ width: "66.8px;" }}></div>
            <div className="form-notch-trailing"></div>
          </div>
        </div>
        <div className="form-outline mb-4">
          <input type="password" id="registerRepeatPassword" className="form-control" />
          <label className="form-label" for="registerRepeatPassword" style={{ marginLeft: "0px;" }}>Repeat
            password</label>
          <div className="form-notch">
            <div className="form-notch-leading" style={{ width: "9px;" }}></div>
            <div className="form-notch-middle" style={{ width: "106.4px;" }}></div>
            <div className="form-notch-trailing"></div>
          </div>
        </div>
        <div className="container d-inline-flex justify-content-around">
          <button className="btn btn-primary btn-block mb-3">Sign up</button>
          <a href="/" className='link-secondary text-decoration-none'>Sign in</a>
        </div>
      </div>
    </div >
  );
}

const AuthPage = () => {
  return (
    <div
      className='container d-flex justify-content-center align-items-center h-100 pt-0 pb-0 ps-0 px-0'
      style={{ minHeight: "100vh" }}>
      {/* <LoginPage /> */}
      <RegisterPage />
    </div>
  );
}

export default AuthPage;
