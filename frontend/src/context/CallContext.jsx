import { useState, createContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import Peer from 'peerjs';
import { io } from 'socket.io-client';
import { setCallConfiguration } from './utils/videocall';

const CallContext = createContext();
const SOCKET = io('http://localhost:5001');
const PEER = new Peer();

function CallProvider({ children }) {
	const [peerId, setPeerId] = useState(null);
	const [stream, setStream] = useState(null);
	const [remoteUser, setRemoteUser] = useState(null);

	const [name, setName] = useState('Guest');
	const [closeCalls, setCloseCalls] = useState(false);
	const [mediaEnabled, setMediaEnabled] = useState(true);

	// * Lógica, permitir acceso a cámara y video.
	useEffect(() => {
		PEER.on('open', id => setPeerId(id));

		if (navigator.mediaDevices) {
			navigator.mediaDevices
				.getUserMedia({
					audio: true,
					video: { width: 1280, height: 1280 },
				})
				.then(stream => setStream(stream))
				.catch(error => {
					console.error(error);
					setMediaEnabled(false);
				});
		} else setMediaEnabled(false);
	}, []);

	// * Lógica de las llamadas
	useEffect(() => {
		if (stream) {
			PEER.on('call', call => {
				console.log('RECEIVING CALL*');

				call.answer(stream);
				setCallConfiguration(SOCKET, call, setRemoteUser);
			});

			SOCKET.on('callTo', ({ remoteId }) => {
				console.log('CALL TO: ' + remoteId);

				const call = PEER.call(remoteId, stream);
				setCallConfiguration(SOCKET, call, setRemoteUser);
			});
		}
	}, [stream]);

	// * Cada que se actualice el usuario remoto:
	useEffect(() => {
		if (peerId && remoteUser === null) {
			SOCKET.emit('waiting', { peerId });
		}
	}, [remoteUser, peerId]);

	// * Si desea cancelar todas las llamadas, quite el usuario con el que pueda estar.
	useEffect(() => {
		if (closeCalls) {
			//? Se deja como un objeto vacio para que no pueda emitir un nuevo evento waitiing en el useEffect superior.
			setRemoteUser({});
		} else {
			setRemoteUser(null);
		}
	}, [closeCalls]);

	return (
		<CallContext.Provider
			value={{
				name,
				setName,
				stream,
				remoteUser,
				closeCalls,
				mediaEnabled,
				setRemoteUser,
				setCloseCalls,
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
