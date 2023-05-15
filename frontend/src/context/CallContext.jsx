import { useState, createContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import Peer from 'peerjs';
import { io } from 'socket.io-client';
import { setCallConfiguration } from './utils/videocall';

const CallContext = createContext();
const SOCKET = io('http://localhost:5001');
const PEER = new Peer();

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

		if (stream) {
			PEER.on('call', call => {
				call.answer(stream);

				setCallConfiguration(SOCKET, call, setRemoteUser);
			});
			SOCKET.on('callTo', ({ remoteId }) => {
				console.log('----------------- CALLTO EVENT --------------');
				console.log(remoteId);

				const call = PEER.call(remoteId, stream);
				setCallConfiguration(SOCKET, call, setRemoteUser);
			});
		}
	}, [stream]);

	useEffect(() => {
		if (remoteUser.stream === undefined) {
			setWaiting(true);
		} else {
			setWaiting(false);
		}
	}, [remoteUser]);

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
