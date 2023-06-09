import '../App.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAuthType,
  selectRemember,
} from '../AuthWindowSlice';
import {
  displayLogin,
  displayRegister,
  changeRemember,
  setAuthorized,
  noAuthorized
} from '../AuthWindowSlice';
import { setCurrentUser } from '../MainWindowSlice';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../App';

async function tryLogin(login, password) {
  const pw_hash = (await axios.get(`${API_URL}/api/hash/${password}`)).data['result'];
  const resp = (await axios.get(`${API_URL}/api/user/login/${login}/${pw_hash}`)).data;
  if (resp['status'] === true) {
    return resp['user_id'];
  }

  return 0;
}

async function registerUser(username, password) {
  const pw_hash = (await axios.get(`${API_URL}/api/hash/${password}`)).data['result'];
  return (await axios.post(`${API_URL}/api/user/add/${username}/${pw_hash}`)).data['status'];
}

async function loadJWT(name, password, user_id) {
  const pw_hash = (await axios.get(`${API_URL}/api/hash/${password}`)).data['result'];
  const resp = (await axios.get(`${API_URL}/api/user/jwt/get/${name}/${pw_hash}`)).data;
  const token = resp['token'];
  document.cookie = `token=${token}&user_id=${user_id}`;
}

const ErrorMessage = ({ text }) => {
  return (
    <div className="alert alert-danger" role="alert">
      {text}
    </div>
  );
}

const LoginPage = () => {
  const remember = useSelector(selectRemember);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [error_msg, setErrorMsg] = useState('');

  const validCreds = (login, password) => {
    if (login === '') {
      setError(true);
      setErrorMsg("ERROR! Login field is empty");
      return false;
    }
    if (password === '') {
      setError(true);
      setErrorMsg("ERROR! Password field is empty");
      return false;
    }
    return true;
  }

  return (
    <div>
      {
        error
          ?
          <ErrorMessage text={error_msg} />
          :
          <></>
      }
      <div className="jumbotron text-center, mb-4">
        <h1>Welcome back!</h1>
      </div>
      <div className="form-outline mb-4">
        <input type="text" name="login" id="loginForm" className="form-control" />
        <label className="form-label" htmlFor="loginForm">Login</label>
      </div>
      <div className="form-outline mb-4">
        <input type="password" name="password" id="passwordForm" className="form-control" />
        <label className="form-label" htmlFor="passwordForm">Password</label>
      </div>
      <div className="row mb-4">
        <div className="col d-flex justify-content-center">
          <div className="form-check">
            <input className="form-check-input" onChange={() => {
              dispatch(changeRemember());
            }} type="checkbox" name="remember" value="" />
            <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
          </div>
        </div>

        <div className="col">
          <a href="/" className='link-secondary text-decoration-none' onClick={(e) => {
            e.preventDefault();
            dispatch(displayRegister());
          }}>Sign Up</a>
        </div>
      </div>
      <div className="row">
        <button className="btn btn-primary btn-block mb-4" onClick={async function (e) {
          e.preventDefault();
          let login = document.getElementById("loginForm").value;
          let password = document.getElementById("passwordForm").value;
          if (validCreds(login, password)) {
            setError(false);

            let user_id = await tryLogin(login, password);
            if (user_id !== 0) {
              if (remember == 1) {
                loadJWT(login, password, user_id);
              }
              setError(false);
              dispatch(setAuthorized());
              dispatch(setCurrentUser(user_id));
            } else {
              setError(true);
              setErrorMsg("ERROR! Incorrect login or password");
              dispatch(noAuthorized());
              document.getElementById("loginForm").value = '';
              document.getElementById("passwordForm").value = '';
            }
          }
        }}>Sign in</button>
      </div>
    </div >
  );
}

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [error_msg, setErrorMsg] = useState('');

  const validCreds = (username, password, repeat_password) => {
    if (username === '') {
      setError(true);
      setErrorMsg("ERROR! Username field is empty")
      return false;
    }

    if (password === '') {
      setError(true);
      setErrorMsg("ERROR! Password field is empty")
      return false;
    }

    if (repeat_password === '') {
      setError(true);
      setErrorMsg("ERROR! Please, repeat your password");
      return false;
    }

    if (password !== repeat_password) {
      setError(true);
      setErrorMsg("ERROR! Passwords dismatch");
      return false;
    }

    return true;
  }

  return (
    <div>
      {
        error
          ?
          <ErrorMessage text={error_msg} />
          :
          <></>
      }
      <div className="jumbotron text-center, mb-4">
        <h1>Create account</h1>
      </div>
      <div className="container">
        <div className="form-outline mb-4">
          <input type="text" id="registerUsername" className="form-control" />
          <label className="form-label" htmlFor="registerUsername">Username</label>
          <div className="form-notch">
            <div className="form-notch-leading"></div>
            <div className="form-notch-middle"></div>
            <div className="form-notch-trailing"></div>
          </div>
        </div>
        <div className="form-outline mb-4">
          <input type="password" id="registerPassword" className="form-control" />
          <label className="form-label" htmlFor="registerPassword">Password</label>
          <div className="form-notch">
            <div className="form-notch-leading"></div>
            <div className="form-notch-middle"></div>
            <div className="form-notch-trailing"></div>
          </div>
        </div>
        <div className="form-outline mb-4">
          <input type="password" id="registerRepeatPassword" className="form-control" />
          <label className="form-label" htmlFor="registerRepeatPassword">Repeat
            password</label>
          <div className="form-notch">
            <div className="form-notch-leading"></div>
            <div className="form-notch-middle"></div>
            <div className="form-notch-trailing"></div>
          </div>
        </div>
        <div className="container d-inline-flex justify-content-around">
          <button className="btn btn-primary btn-block mb-3" onClick={async function (e) {
            e.preventDefault();
            let username = document.getElementById("registerUsername").value;
            let password = document.getElementById("registerPassword").value;
            let repeat_password = document.getElementById("registerRepeatPassword").value;
            if (validCreds(username, password, repeat_password)) {
              if ((await registerUser(username, password)) !== true) {
                setError(true);
                setErrorMsg("User with this name already exists");
              } else {
                setError(false);
                dispatch(displayLogin());
              }
            } else {
              document.getElementById("registerUsername").value = '';
              document.getElementById("registerPassword").value = '';
              document.getElementById("registerRepeatPassword").value = '';
            }
          }}>Sign up</button>
          <a href="/" className='link-secondary text-decoration-none' onClick={(e) => {
            e.preventDefault();
            dispatch(displayLogin());
          }}>Sign in</a>
        </div>
      </div>
    </div >
  );
}

const AuthPage = () => {
  const content_type = useSelector(selectAuthType);

  return (
    <div
      className='container d-flex justify-content-center align-items-center h-100 pt-0 pb-0 ps-0 px-0'
      style={{ minHeight: "100vh" }}>
      {
        content_type
          ?
          <RegisterPage />
          :
          <LoginPage />
      }
    </div>
  );
}

export default AuthPage;
