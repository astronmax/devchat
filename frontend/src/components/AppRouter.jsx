import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';

const privateRoutes = [
  { path: '/home', component: MainPage }
];

const publicRoutes = [
  { path: '/login', component: LoginPage }
]

const AppRouter = () => {
  const auth = true;
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
        <Route path="*" Component={LoginPage} />
      </Routes>
  );
}

export default AppRouter;