import express from "express";

const app = express();

app.get('/', (req, res) => {
  res.send({ 'status': 'OK' });
});

app.listen(4000);