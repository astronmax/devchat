import express from 'express';
import user_router from './controller/user_controller.js';
import group_router from './controller/group_controller.js';
import { hash } from './service/security.js';
import { WebSocketServer } from 'ws';
import { add_group_msg } from './service/group_service.js';
import { add_direct_msg, get_user_by_id } from './service/user_service.js';

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/user/', user_router);
app.use('/api/group/', group_router);

app.get('/api/hash/:text', async function (req, res) {
  res.send({ 'status': true, 'result': hash(req.params.text) });
});

app.listen(4000);

const wss = new WebSocketServer({ port: 8080 });

let sockets = [];
wss.on('connection', function (ws, req) {
  sockets.push(ws);
  console.log("[+] New WebSocket connection");

  ws.on('message', async function (msg) {
    let message = JSON.parse(msg);
    let id = 0;
    if (message['dst'] !== 0) {
      if (message['type'] == 0) {
        // groups
        id = await add_group_msg(message['src'], message['dst'], message['body']);
      } else {
        id = await add_direct_msg(message['src'], message['dst'], message['body']);
      }
    }
    let user = await get_user_by_id(message['src']);
    let resp = {
      'type': message['type'],
      'src': message['src'],
      'dst': message['dst'],
      'body': message['body'],
      'username': user['name'],
      'id': id
    };
    sockets.forEach(s => s.send(JSON.stringify(resp)));
  })
})
