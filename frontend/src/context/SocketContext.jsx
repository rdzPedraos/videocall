import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

import Peer from 'peerjs';
import { io } from 'socket.io-client';

const SocketContext = createContext();
const SOCKET = io(import.meta.env.VITE_SERVER_URL);
const PEER = new Peer();

function SocketProvider({ children }) {
	const [peerId, setPeerId] = useState(null);

	PEER.on('open', id => {
		console.log('PEER ID: ' + id);
		setPeerId(id);
	});

	return (
		<SocketContext.Provider value={{ peerId, SOCKET, PEER }}>
			{children}
		</SocketContext.Provider>
	);
}

SocketProvider.propTypes = {
	children: PropTypes.object,
};
export { SocketContext, SocketProvider };
