import express from "express";
import {
  add_group,
  add_user_to_group,
  delete_user_from_group,
  get_users_count,
  get_group_msgs
} from '../service/group_service.js';
import { check_secret } from '../service/security.js';

const group_router = express.Router();

group_router.post('/add/:name', async function (req, res) {
  let secret = req.query['secret'];
  if (!check_secret(secret)) {
    res.send({ 'status': false });
  } else {
    res.send({ 'status': (await add_group(req.params.name)) });
  }
})

group_router.post('/add_user/:group_id/:user_id', async function (req, res) {
  let secret = req.query['secret'];
  if (!check_secret(secret)) {
    res.send({ 'status': false });
  } else {
    res.send({ 'status': (await add_user_to_group(req.params.group_id, req.params.user_id)) })
  }
});

group_router.get('/get_users_count/:group_id', async function (req, res) {
  res.send({ 'status': true, 'users_count': (await get_users_count(req.params.group_id)) })
});

group_router.get('/get_group_msgs/:group_id', async function (req, res) {
  let result = await get_group_msgs(req.params.group_id);
  res.send({ 'status': true, 'messages': result });
});

group_router.delete('/delete_user/:user_id/:group_id', async function (req, res) {
  let result = await delete_user_from_group(req.params.user_id, req.params.group_id);
  res.send({ 'status': result });
});

export default group_router;
