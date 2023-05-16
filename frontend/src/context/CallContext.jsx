import { useState, createContext, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { setCallConfiguration } from './utils/videocall';
import { SocketContext } from './SocketContext';

const CallContext = createContext();

function CallProvider({ children }) {
	const { PEER, SOCKET, peerId } = useContext(SocketContext);

	const [stream, setStream] = useState(null);
	const [remoteUser, setRemoteUser] = useState(null);

	const [name, setName] = useState('Guest');
	const [stopStreaming, setStopStreaming] = useState(false);
	const [mediaEnabled, setMediaEnabled] = useState(true);

	// * Lógica, permitir acceso a cámara y video. Y setear los eventos base de la llamada.
	useEffect(() => {
		if (navigator.mediaDevices) {
			navigator.mediaDevices
				.getUserMedia({
					audio: true,
					video: { width: 1280, height: 1280 },
				})
				.then(stream => {
					setStream(stream);
				})
				.catch(error => {
					console.error(error);
					setMediaEnabled(false);
				});
		} else setMediaEnabled(false);
	}, []);

	useEffect(() => {
		const handleCallTo = ({ remoteId }) => {
			console.log('CALL TO: ' + remoteId);

			const call = PEER.call(remoteId, stream);
			setCallConfiguration(SOCKET, call, setRemoteUser);
		};

		const handleResponseCalled = call => {
			console.log('RECEIVING CALL*');

			call.answer(stream);
			setCallConfiguration(SOCKET, call, setRemoteUser);
		};

		PEER.on('call', handleResponseCalled);
		SOCKET.on('callTo', handleCallTo);

		return () => {
			PEER.off('call', handleResponseCalled);
			SOCKET.off('callTo', handleCallTo);
		};
	}, [PEER, SOCKET, stream]);

	// * Cada que se actualice el usuario remoto:
	useEffect(() => {
		if (!stopStreaming && peerId && remoteUser === null && stream) {
			console.log('WAITING FOR A CALLED*');
			SOCKET.emit('waiting', { peerId });
		}
	}, [remoteUser, peerId, stream, stopStreaming, SOCKET]);

	// * Quita cualquier conexión con usuario remoto si está en true "stopStreaming"
	useEffect(() => {
		if (stopStreaming) {
			SOCKET.emit('stopStreaming');
		}
	}, [SOCKET, stopStreaming]);

	return (
		<CallContext.Provider
			value={{
				name,
				setName,
				stream,
				remoteUser,
				mediaEnabled,
				setRemoteUser,
				stopStreaming,
				setStopStreaming,
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
