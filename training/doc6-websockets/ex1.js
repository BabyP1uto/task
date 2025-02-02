const WebSocket = require('ws');

const socketUrl = 'wss://stream.binance.com:9443/ws/btcusdt@trade';

const socket = new WebSocket(socketUrl);

socket.on('open', () => {
  console.log('Соединение установлено!');

  socket.send('Hola serv!');

  setTimeout(() => {
    socket.close();
  }, 5000);
});

socket.on('message', (data) => {
  console.log('Получены данные от сервера:', data);
});

socket.on('close', () => {
  console.log('Соединение закрыто.');
});

socket.on('error', (error) => {
  console.error('Ошибка WebSocket:', error);
});
