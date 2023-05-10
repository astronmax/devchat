import express from 'express';
import user_router from './controller/user_controller.js';
import { hash } from './service/security.js';

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/user/', user_router);

app.get('/api/hash/:text', async function (req, res) {
  res.send({ 'status': true, 'result': hash(req.params.text) });
});

app.listen(4000);
