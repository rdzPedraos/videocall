import { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import Peer from 'peerjs';
import { io } from 'socket.io-client';

const CallContext = createContext();
const SOCKET = io('http://localhost:5001');
const PEER = new Peer({});

function CallProvider({ children }) {
	const [id, setId] = useState(null);
	const [enabled, setEnabled] = useState(true);
	const [name, setName] = useState('Guest');
	const [stream, setStream] = useState(null);
	const [remoteUser, setRemoteUser] = useState({});
	const [waiting, setWaiting] = useState(false);

	// * Lógica, permitir acceso a cámara y video.
	useEffect(() => {
		if (navigator.mediaDevices) {
			navigator.mediaDevices
				.getUserMedia({
					audio: true,
					video: { width: 1280, height: 1280 },
				})
				.then(stream => {
					setStream(stream);
					setWaiting(true);
				})
				.catch(error => {
					console.error(error);
					setEnabled(false);
				});
		} else setEnabled(false);
	}, []);

	useEffect(() => {
		PEER.on('open', id => {
			console.log('he cambiado ', id);
			setId(id);
		});

		PEER.on('call', call => {
			call.answer(stream);

			call.on(
				'stream',
				stream => setRemoteUser(pre => ({ ...pre, stream })),
				err => console.error(err)
			);

			SOCKET.on('closeCall', () => {
				console.log('estoy dentro del peer');
				call.close();
				setRemoteUser({});
			});
		});
	}, []);

	useEffect(() => {
		SOCKET.on('callTo', ({ remoteId }) => {
			console.log('----------------- CALLTO EVENT --------------');
			console.log(remoteId);

			const conn = PEER.call(remoteId, stream);

			conn.on(
				'stream',
				stream => {
					setRemoteUser(pre => ({ stream, ...pre }));
					setWaiting(false);
				},
				err => console.error(err)
			);

			SOCKET.on('closeCall', () => {
				console.log('estoy dentro del socket');
				conn.close();
				setRemoteUser({});
			});
		});
	}, []);

	// * Cuando desee buscar una nueva conexión
	useEffect(() => {
		if (!waiting || id === null) return;

		console.log('----------------- WAITING EVENT --------------');
		console.log('ID: ' + id);
		SOCKET.emit('waiting', { peerId: id });
	}, [waiting, id]);

	return (
		<CallContext.Provider
			value={{
				name,
				setName,
				stream,
				remoteUser,

				enabled,
				waiting,
				setWaiting,
			}}
		>
			{children}
		</CallContext.Provider>
	);
}

CallProvider.propTypes = {
	children: PropTypes.array,
};

export { CallContext, CallProvider };
