const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server, {
	cors: {
		origin: 'http://localhost:3000',
		method: ['GET', 'POST'],
	},
});

let users = [];

io.on('connection', socket => {
	console.log('----------------- NUEVA CONEXIÓN --------------');
	console.log('ID: ' + socket.id);

	socket.on('waiting', ({ peerId }) => {
		console.log('----------------- WAITING EVENT --------------');
		console.log('ID: ' + peerId + ' DEL SOCKET ' + socket.id);

		/* socket.emit('closeCall'); */
		users = users.filter(user => user.id !== socket.id);
		console.table(users);

		if (users.length !== 0) {
			const remoteUser = users.shift();
			socket.emit('callTo', { remoteId: remoteUser.peerId });
		} else {
			users.push({ id: socket.id, peerId });
		}
		console.table(users);
	});

	socket.on('disconnect', () => {
		console.log('----------------- DISCONNECT EVENT --------------');
		console.log('ID: ' + socket.id);
		users = users.filter(user => user.id !== socket.id);
	});
});

server.listen(5001, () => {
	console.log('Server is running on port 5001');
});
