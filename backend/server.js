const express = require('express');
const http = require('http');
const socket = require('socket.io');

const EVENTS = require('./src/events');
const User = require('./src/User');

const app = express();
const server = http.createServer(app);

// Deploy proyect from
app.use(express.static('../public'));

//Just allow request from
const io = socket(server, {
	cors: {
		/*origin: 'http://localhost:3000',*/
		origin: '*',
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
}

//Help to data format
function getDataAttributes(data) {
	const { name, audio, video } = data;
	return { name, audio, video };
}

io.on(EVENTS.CONNECTION, socket => {
	const socketId = socket.id;
	console.log(`-| NEW CONNECTION : ${socketId}`);

	socket.on(EVENTS.STOP_STREAMING, () => {
		if (!users.has(socketId)) return;
		stopConnection(users.get(socketId));
	});

	socket.on(EVENTS.WAITING, ({ peerId, userData }) => {
		console.log(`-| WAITING CALLED: ${socketId}, PEERID: ${peerId}`);

		// If the user already exists, remove their waiting state
		if (users.has(socketId)) {
			usersWaiting = usersWaiting.filter(user => user.id !== socketId);
		} else {
			users.set(
				socketId,
				new User(socketId, peerId, getDataAttributes(userData))
			);
		}

		const user = users.get(socketId);
		stopConnection(user);

		if (usersWaiting.length !== 0) {
			const remoteUser = usersWaiting.shift();
			user.connect(remoteUser);

			socket.emit(EVENTS.CALL_TO, { remoteId: remoteUser.peerId });

			socket.emit(EVENTS.CHANGE_DATA, getDataAttributes(remoteUser));
			io.to(remoteUser.id).emit(EVENTS.CHANGE_DATA, getDataAttributes(user));
		} else {
			usersWaiting.push(user);
		}

		console.log('USERS');
		console.log(users);

		console.log('WAITING QUEUE');
		console.table(usersWaiting);
	});

	socket.on(EVENTS.CHANGE_DATA, userData => {
		console.log(
			`-| CHANGE_DATA CALLED: ${socketId}, NEW_DATA: ${JSON.stringify(
				userData
			)}`
		);

		if (!users.has(socketId)) return;
		const user = users.get(socketId);

		const data = getDataAttributes(userData);
		user.setData(data); // update user's data

		// emit the new name to the user it's connected to
		const otherUser = users.get(user.connection);
		if (otherUser) {
			io.to(otherUser.id).emit(EVENTS.CHANGE_DATA, data);
		}
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
