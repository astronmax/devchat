import express from "express";
import {
  add_user,
  try_login,
  get_user_by_id,
  get_groups,
  get_directs,
  get_direct_msgs,
} from '../service/user_service.js';
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

user_router.get('/jwt/check/:user_id', async function (req, res) {
  res.send({ 'status': check_jwt(req.query['token'], req.params.user_id) });
});

user_router.get('/get/:id', async function (req, res) {
  let user = await get_user_by_id(req.params.id);
  res.send({ 'status': true, 'name': user['name'] });
});

user_router.get('/get_groups/:id', async function (req, res) {
  let result = await get_groups(req.params.id);
  res.send({ 'status': true, 'groups': result });
});

user_router.get('/get_directs/:id', async function (req, res) {
  let result = await get_directs(req.params.id);
  res.send({ 'status': true, 'directs': result });
});

user_router.get('/get_direct_msgs/:user_id/:direct_id', async function (req, res) {
  let result = await get_direct_msgs(req.params.user_id, req.params.direct_id);
  res.send({ 'status': true, 'messages': result });
});

export default user_router;
