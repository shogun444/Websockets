"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let users = [];
wss.on('connection', (socket) => {
    socket.send('connection made');
    socket.on('message', (msg) => {
        var _a;
        const parse = JSON.parse(msg.toString());
        if (parse.type === 'join') {
            const user = {
                roomId: parse.payload.roomId,
                socket: socket
            };
            users.push(user);
        }
        if (parse.type === 'chat') {
            const checkRoom = (_a = users.find(user => user.socket === socket)) === null || _a === void 0 ? void 0 : _a.roomId;
            users.forEach((user) => {
                if (user.roomId === checkRoom)
                    user.socket.send(parse.payload.message);
            });
        }
    });
});
