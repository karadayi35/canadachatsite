export const createWebSocket = (url, onMessageCallback) => {
    const websocket = new WebSocket(url);
  
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessageCallback(data);
    };
  
    return websocket;
  };
  