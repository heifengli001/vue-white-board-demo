// 使用 ws 模块 搭建一个简单的nodejs的websocket 服务端
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 7788 });
const clients = [];
wss.on("connection", (ws, request) => {
  const clientId = request.headers["sec-websocket-protocol"];
  if (clientId) {
    ws.clientId = clientId;
    clients.push(clientId);
  }

  ws.on("message", (message) => {
    if (message == "ping") {
      return;
    }
    clientId && boardcast2Others(message, clientId);
  });

  ws.on("close", () => {
    clients.splice(clients.indexOf(clientId), 1);
    console.log("Client disconnected");
  });
});
wss.on("listening", () => {
  console.log("WebSocket server is listening on port 7788");
});

// 广播给其他客户端
const boardcast2Others = (message, clientId) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client.clientId !== clientId) {
      client.send(message.toString());
    }
  });
};
