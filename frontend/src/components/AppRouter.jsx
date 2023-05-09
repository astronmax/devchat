import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import AuthPage from '../pages/AuthPage';
import { selectAuthorized } from '../AuthWindowSlice';
import { useSelector } from 'react-redux';

const privateRoutes = [
  { path: '/home', component: MainPage },
  { path: '/', component: MainPage }
];

const publicRoutes = [
  { path: '/login', component: AuthPage },
  { path: '/register', component: AuthPage },
  { path: '/', component: AuthPage }
]

const AppRouter = () => {
  const auth = useSelector(selectAuthorized);
  return (
    auth
      ?
      <Routes>
        {privateRoutes.map(route =>
          <Route path={route.path} Component={route.component} key={route.path} />
        )}
      </Routes>
      :
      <Routes>
        {publicRoutes.map(route =>
          <Route path={route.path} Component={route.component} key={route.path} />
        )}
      </Routes>
  );
}

export default AppRouter;