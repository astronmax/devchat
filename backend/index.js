import express from 'express';
import user_router from './controller/user_controller.js';

const app = express();

app.use('/api/user/', user_router);

app.listen(4000);
