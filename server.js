import * as WebSocket from 'ws';
const WebSocketServer = WebSocket.default.Server;

import { createServer } from 'http';
import { createReadStream } from 'fs';

const server = createServer((req, res) => {
  createReadStream("index.html").pipe(res);
});
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const msg = JSON.parse(data);
    const now = performance.now();
    const diff = now - msg.time;

    setTimeout(() => {
      ws.send(JSON.stringify({ time: performance.now(), diff }));
    }, 100);
  });
});

server.listen(8080);
console.log("Listening http://localhost:8080/");
