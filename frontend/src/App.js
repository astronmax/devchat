import AppRouter from './components/AppRouter';
import './App.css';

import { setAuthorized } from './AuthWindowSlice';
import { useDispatch } from 'react-redux';

const checkJWT = (token) => {
  return true;
}

const App = () => {
  const dispatch = useDispatch();

  if (document.cookie !== '') {
    let token = document.cookie.split('=')[1];
    if (checkJWT(token)) {
      dispatch(setAuthorized());
    }
  }

  return (
    <AppRouter />
  );
}

export default App;
