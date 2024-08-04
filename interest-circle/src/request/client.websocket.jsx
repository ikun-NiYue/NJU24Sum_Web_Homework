const client = new WebSocket('ws://127.0.0.1:7001');

client.onopen = () => {
  console.log('client connected');
  client.send('Hello');
}

client.onmessage = (message) => {
  console.log('Received message:', message.data);
}

client.onerror = (error) => {
  console.error('An error occurred:', error);
}

export async function sendMessage(message) {
  client.send(message);
}