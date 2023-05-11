import AppRouter from './components/AppRouter';
import './App.css';

import { setAuthorized } from './AuthWindowSlice';
import { setCurrentUser } from './MainWindowSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export const WS_URL = 'ws://192.168.1.14:8080';
export const API_URL = 'http://192.168.1.14:4000';

const App = () => {
  const dispatch = useDispatch();

  if (document.cookie !== '') {
    let cookies = document.cookie.split('&');
    let parsed_token = cookies[0].split('=')[1];
    let user_id = cookies[1].split('=')[1];
    axios.get(`${API_URL}/api/user/jwt/check/${user_id}`, {
      params: { token: parsed_token }
    }).then((resp) => {
      if (resp.data['status'] === true) {
        dispatch(setAuthorized());
        dispatch(setCurrentUser(user_id));
      };
    });
  }

  return (
    <AppRouter />
  );
}

export default App;
