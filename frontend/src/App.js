import AppRouter from './components/AppRouter';
import './App.css';

import { setAuthorized } from './AuthWindowSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const App = () => {
  const dispatch = useDispatch();

  if (document.cookie !== '') {
    let cookies = document.cookie.split('&');
    let parsed_token = cookies[0].split('=')[1];
    let user_id = cookies[1].split('=')[1];
    axios.get(`http://127.0.0.1:4000/api/user/jwt/check/${user_id}`, {
      params: { token: parsed_token }
    }).then((resp) => {
      if (resp.data['status'] === true) dispatch(setAuthorized());
    });
  }

  return (
    <AppRouter />
  );
}

export default App;
