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

let usersWaiting = [];
const connections = [];

io.on('connection', socket => {
	const ID = socket.id;
	console.log('-| NEW CONNECTION : ' + ID);

	function stopConnection() {
		const position = connections.findIndex(conn => conn.some(id => id === ID));

		if (position !== -1) {
			const [id_1, id_2] = connections[position];

			io.to(id_1).emit('closeCall');
			io.to(id_2).emit('closeCall');

			connections.splice(position, 1);
		}
	}

	socket.on('stopStreaming', () => {
		stopConnection();
	});

	socket.on('waiting', ({ peerId }) => {
		console.log('-| WAITING CALLED: ' + ID + ', PEERID: ' + peerId);
		console.table(usersWaiting);

		stopConnection();
		usersWaiting = usersWaiting.filter(user => user.id !== ID);

		if (usersWaiting.length !== 0) {
			const remoteUser = usersWaiting.shift();

			connections.push([remoteUser.id, ID]);
			socket.emit('callTo', { remoteId: remoteUser.peerId });
		} else {
			usersWaiting.push({ id: ID, peerId });
		}

		console.table(usersWaiting);
	});

	socket.on('disconnect', () => {
		console.log('-| DISCONNECT: ' + ID);
		usersWaiting = usersWaiting.filter(user => user.id !== ID);
		stopConnection();
	});
});

server.listen(5001, () => {
	console.log('Server is running on port 5001');
});
