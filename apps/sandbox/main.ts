import express from 'express';
import next from 'next';
import path from 'path';

const conf = require('./next.config.js').default;

const APP_DIR = 'apps/sandbox';
const port = parseInt(process.env.PORT, 10) || 4200;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf, dir: APP_DIR });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/service-worker.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/service-worker.js'));
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.info(`> Ready on port: ${port}`);
  });
});
