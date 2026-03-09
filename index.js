import { createServer } from 'node:http';

const port = 8001;

const server = createServer();

server.on('request', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('portal')
})

server.listen(port)
