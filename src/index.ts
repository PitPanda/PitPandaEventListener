import WebSocket from 'ws';

import servers from './servers';

(function connect(){
  let ws: (WebSocket | null) = new WebSocket('wss://pitpanda.rocks/api/events');
  
  let pingLoop: NodeJS.Timeout;

  ws.on('error', data => {
    console.log('errored on events');
    console.error(data);
    ws=null;
    setTimeout(connect, 10e3);
  });

  ws.on('open', () => {
    console.log('connected on events');
    pingLoop = setInterval(() => ws?.send('2'), 20e3);
  })

  ws.on('message', (data: string) => {
    if(data==='3') return;
    console.log(data);
    const event = JSON.parse(data);
    servers.forEach(server => server.sendEvent(event));
  });

  ws.on('close', (code, reason) => {
    clearInterval(pingLoop);
    console.log('Lost connection on events? reconnecting in 10s');
    ws=null;
    setTimeout(connect, 10e3);
  });
})();

(function connect(){
  let ws: (WebSocket | null) = new WebSocket('wss://pitpanda.rocks/api/forums');
  
  let pingLoop: NodeJS.Timeout;

  ws.on('error', data => {
    console.log('errored on forums');
    console.error(data);
    ws=null;
    setTimeout(connect, 10e3);
  });

  ws.on('open', () => {
    console.log('connected on forums');
    pingLoop = setInterval(() => ws?.send('2'), 20e3);
  })

  ws.on('message', (data: string) => {
    if(data==='3') return;
    console.log(data);
    const forum = JSON.parse(data);
    servers.forEach(server => server.sendForums(forum));
  });

  ws.on('close', (code, reason) => {
    clearInterval(pingLoop);
    console.log('Lost connection on forums? reconnecting in 10s');
    ws=null;
    setTimeout(connect, 10e3);
  });
})();



process.stdin.resume();