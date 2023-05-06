import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const privateRoutes = [
  { path: '/home', component: MainPage },
  { path: '/', component: MainPage }
];

const publicRoutes = [
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/', component: LoginPage }
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