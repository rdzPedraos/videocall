import { useState, createContext, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { setCallConfiguration } from './utils/videocall';
import { SocketContext } from './SocketContext';

const CallContext = createContext();

function CallProvider({ children }) {
	const { PEER, SOCKET, peerId } = useContext(SocketContext);

	const [user, setUser] = useState({
		name: 'Guest',
		stream: null,
		audio: true,
		video: true,
	});
	const [remoteUser, setRemoteUser] = useState(null);

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
					setUser(user => ({ ...user, stream }));
				})
				.catch(error => {
					console.error(error);
					setMediaEnabled(false);
				});
		} else setMediaEnabled(false);
	}, []);

	// * Handle in and out calls events
	useEffect(() => {
		const handleCall = call => {
			call.answer(user.stream);
			setCallConfiguration(SOCKET, call, setRemoteUser);
		};

		const handleCallTo = ({ remoteId }) => {
			const call = PEER.call(remoteId, user.stream);
			setCallConfiguration(SOCKET, call, setRemoteUser);
		};

		const handleChangeData = data => {
			console.log(data);
			setRemoteUser(user => ({ ...user, ...data }));
		};

		PEER.on('call', handleCall);
		SOCKET.on('callTo', handleCallTo);
		SOCKET.on('changeData', handleChangeData);

		return () => {
			PEER.off('call', handleCall);
			SOCKET.off('callTo', handleCallTo);
			SOCKET.off('changeData', handleChangeData);
		};
	}, [PEER, SOCKET, user.stream]);

	// * Every time the name, audio or video change:
	useEffect(() => {
		SOCKET.emit('changeData', {
			name: user.name,
			audio: user.audio,
			video: user.video,
		});
	}, [user.name, user.audio, user.video, SOCKET]);

	// * Every time the remoteUser is null send a waiting event to the server
	useEffect(() => {
		if (remoteUser === null && !stopStreaming && peerId && user.stream) {
			console.log('WAITING FOR A CALL*');
			SOCKET.emit('waiting', { peerId, userData: user });
		}
	}, [remoteUser, peerId, stopStreaming, user, mediaEnabled, SOCKET]);

	// * When stopStreaming is true, send a stopStreaming event to the server to stop any connection
	useEffect(() => {
		if (stopStreaming) {
			SOCKET.emit('stopStreaming');
		}
	}, [SOCKET, stopStreaming]);

	return (
		<CallContext.Provider
			value={{
				user,
				setUser,

				remoteUser,
				setRemoteUser,

				mediaEnabled,
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
