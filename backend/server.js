const express = require('express');
const http = require('http');
const socket = require('socket.io');

const EVENTS = require('./src/events');
const User = require('./src/User');

const app = express();
const server = http.createServer(app);

const io = socket(server, {
	cors: {
		origin: 'http://localhost:3000',
		method: ['GET', 'POST'],
	},
});

let usersWaiting = [];
const users = new Map();

// Stops the connection of the specified user
function stopConnection(user) {
	if (!user.isConnected()) return;

	const otherUser = users.get(user.connection);
	user.disconnect();
	otherUser.disconnect();

	// Emit the closeCall event to the two users
	io.to(user.id).to(otherUser.id).emit(EVENTS.CLOSE_CALL);

	// Add the other user back to the queue if they are still connected
	if (io.sockets.sockets.has(otherUser.id)) {
		usersWaiting.push(otherUser);
	}
}

io.on(EVENTS.CONNECTION, socket => {
	const socketId = socket.id;
	console.log(`-| NEW CONNECTION : ${socketId}`);

	socket.on(EVENTS.STOP_STREAMING, () => {
		if (!users.has(socketId)) return;
		stopConnection(users.get(socketId));
	});

	socket.on(EVENTS.WAITING, ({ peerId }) => {
		console.log(`-| WAITING CALLED: ${socketId}, PEERID: ${peerId}`);

		// If the user already exists, remove their waiting state
		if (users.has(socketId)) {
			usersWaiting = usersWaiting.filter(user => user.id !== socketId);
		} else {
			users.set(socketId, new User(socketId, peerId));
		}

		const user = users.get(socketId);
		stopConnection(user);

		if (usersWaiting.length !== 0) {
			const remoteUser = usersWaiting.shift();
			user.connect(remoteUser);
			socket.emit(EVENTS.CALL_TO, { remoteId: remoteUser.peerId });
		} else {
			usersWaiting.push(user);
		}

		console.log('USERS');
		console.log(users);

		console.log('WAITING QUEUE');
		console.table(usersWaiting);
	});

	socket.on(EVENTS.DISCONNECT, () => {
		console.log(`-| DISCONNECT: ${socketId}`);
		if (!users.has(socketId)) return;
		const user = users.get(socketId);

		usersWaiting = usersWaiting.filter(
			waitingUser => waitingUser.id !== user.id
		);

		stopConnection(user);
		users.delete(socketId);
	});
});

server.listen(5001, () => {
	console.log('Server is running on port 5001');
});
