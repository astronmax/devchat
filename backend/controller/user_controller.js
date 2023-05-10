import express from "express";
import { add_user, try_login } from '../service/user_service.js';
import { create_jwt, check_jwt } from '../service/security.js';

const user_router = express.Router();

user_router.post('/add/:name/:password', async function (req, res) {
  let status = await add_user(req.params.name, req.params.password);
  res.send({ 'status': status });
});

user_router.get('/login/:name/:password', async function (req, res) {
  let user_id = await try_login(req.params.name, req.params.password);
  if (user_id !== 0) {
    res.send({ 'status': true, 'user_id': user_id });
  } else {
    res.send({ 'status': false });
  }
});

user_router.get('/jwt/get/:name/:password', async function (req, res) {
  let user_id = await try_login(req.params.name, req.params.password);
  if (user_id !== 0) {
    res.send({ 'status': true, 'token': create_jwt(user_id) });
  } else {
    res.send({ 'status': false });
  }
});

user_router.get('/jwt/check', async function (req, res) {
  res.send({ 'status': check_jwt(req.query['token']) });
});

export default user_router;
