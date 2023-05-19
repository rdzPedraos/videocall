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

	// * Allow access to camera and video. And set the base events of the call.
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

	// * Handle in and out calls events
	useEffect(() => {
		let callerName = null;

		const handleCallTo = ({ remoteId, name }) => {
			const call = PEER.call(remoteId, stream);
			setCallConfiguration(SOCKET, call, setRemoteUser, name);
		};

		const handleCallFrom = ({ callerId, name }) => {
			callerName = name;
		};

		const handleCall = call => {
			call.answer(stream);
			setCallConfiguration(SOCKET, call, setRemoteUser, callerName);
		};

		PEER.on('call', handleCall);

		SOCKET.on('callFrom', handleCallFrom);
		SOCKET.on('callTo', handleCallTo);

		return () => {
			PEER.off('call', handleCall);
			SOCKET.off('callFrom', handleCallFrom);
			SOCKET.off('callTo', handleCallTo);
		};
	}, [PEER, SOCKET, stream]);

	// * Every time the remoteUser is null send a waiting event to the server
	useEffect(() => {
		if (!stopStreaming && peerId && remoteUser === null && stream) {
			console.log('WAITING FOR A CALL*');
			SOCKET.emit('waiting', { peerId, name });
		}
	}, [remoteUser, peerId, stream, stopStreaming, SOCKET]);

	// * When stopStreaming is true, send a stopStreaming event to the server to stop any connection
	useEffect(() => {
		if (stopStreaming) {
			SOCKET.emit('stopStreaming');
		}
	}, [SOCKET, stopStreaming]);

	// * Every time the name changes:
	useEffect(() => {
		SOCKET.emit('changeName', { newName: name });
	}, [name, SOCKET]);

	// * Every time the server sends a name change:
	useEffect(() => {
		const handleNameChange = ({ newName }) => {
			setRemoteUser(user => ({ ...user, name: newName }));
		};

		SOCKET.on('changeName', handleNameChange);

		return () => {
			SOCKET.off('changeName', handleNameChange);
		};
	}, [SOCKET]);

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
